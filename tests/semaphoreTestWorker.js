"use strict";

self.importScripts("/dist/lib.js")
const commands = {
   incrementTest({ sab, numIter }) {
      const s = new Cephalopod.Semaphore(sab, 0);
      const heap = new Int32Array(sab);
      try {
         for (let x = 0; x < numIter; x++) {
            s.wait();
            heap[1]++;
            s.post();
         }
         self.postMessage("done");
      } catch (e) {
         self.postMessage("fail");
      }
   }
}

self.addEventListener("message", msg => {
   commands[msg.data.command](msg.data.data)
});
