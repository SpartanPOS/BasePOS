import {SRP, SrpServer} from 'fast-srp-hap';
import {prisma} from './prisma';
import Client from 'redis';

interface SRPSession {
  server: InstanceType<typeof SrpServer>;
  createdAt: number;
}

class SessionStore {
  private sessions: Map<string, SRPSession> = new Map();
  private readonly SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
  private client = Client.createClient();
  private conn = this.client.connect();

  async createSession(server: InstanceType<typeof SrpServer>, user: { username: string, salt: string, verifier: string }): Promise<string> {
    // Clean up expired sessions
    this.cleanExpiredSessions();

    // Generate unique session ID
    const sessionId = Math.random().toString(36).substring(2);

    // Store session with timestamp
    this.client.set(sessionId, JSON.stringify(user));

    this.sessions.set(sessionId, {server, createdAt: Date.now()});

    console.log('session  "' + sessionId + '"  created');

    return sessionId;
  }

  async getSession(sessionId: string): Promise<InstanceType<typeof SrpServer> | null> {
    if (!sessionId) return null;

    // Clean up expired sessions
    this.cleanExpiredSessions();

    let session = this.sessions.get(sessionId);

    if (!session) {
      const prismaSession = await prisma.session.findUnique({
        where: {sessionId: sessionId},
      });

      if (prismaSession) {
        const user = JSON.parse(prismaSession['user']);
        const server = new SrpServer(SRP.params['2048'], Buffer.from(user.salt), Buffer.from(user.verifier) );
        this.sessions.set(sessionId, {server, createdAt: Date.now()});
        session = {server, createdAt: Date.now()};
      }
    }

    if (!session ) {
      return null;
    }

    // Check if session has expired
    if (Date.now() - session?.createdAt > this.SESSION_TIMEOUT) {
      console.log('session  "' + sessionId + '"  expired');
      this.sessions.delete(sessionId);
      prisma.session.delete({
        where: {sessionId},
      });
      return null;
    }

    return session.server;
  }

  async removeSession(sessionId: string): Promise<void> {
    console.log('session  ' + sessionId + '  removed');
    await prisma.session.delete({
      where: {sessionId},
    });
    this.sessions.delete(sessionId);
  }

  private cleanExpiredSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.createdAt > this.SESSION_TIMEOUT) {
        console.log('session  "' + sessionId + '"  expired');
        prisma.session.delete({
          where: {sessionId},
        });
        this.sessions.delete(sessionId);
      }
    }
  }
}

// Export a singleton instance
export const sessionStore = new SessionStore();
