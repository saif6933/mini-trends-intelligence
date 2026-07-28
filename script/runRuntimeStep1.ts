import { executeRuntimeStep1 } from "../lib/intelligence/testPipelineParity";

console.log("--- Executing Runtime Step 1 ---");
const result = executeRuntimeStep1();
console.log(JSON.stringify(result, null, 2));