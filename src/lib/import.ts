import path from "node:path";
import { open } from "node:fs/promises";
import { unzip } from "node:zlib";
import { PathLike } from "node:fs";
import { verify } from "node:crypto";
import repo from "./repo";

async function importPosModule(name: PathLike): Promise<void> {
    const fileHandle = await open(name, "r");
    const buffer = await fileHandle.readFile();
    fileHandle.close();

    let file: Buffer;
    await new Promise<void>((resolve, reject) => {
        unzip(buffer, (err, unzipped) => {
            if (err) reject(err); else {file = unzipped; resolve()}
        })
    })
    
    // let signature = repo.checkSignature()
    
}
