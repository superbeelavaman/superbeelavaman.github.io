const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

class MyBlocks {
    constructor (runtime) {
        /**
         * Store this for later communication with the Scratch VM runtime.
         * If this extension is running in a sandbox then `runtime` is an async proxy object.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }
    
    getInfo() {
        return {
            "id": "MyBlocks",
            "name": "My blocks",
            "blocks": [{
                    "opcode": "substring",
                    "blockType": BlockType.REPORTER,
                    "text": "letters [num1] through [num2] of [string]",
                    "arguments": {
                        "num1": {
                            "type": "number",
                            "defaultValue": "2"
                        },
                        "num2": {
                            "type": "number",
                            "defaultValue": "5"
                        },
                        "string": {
                            "type": "string",
                            "defaultValue": "hello world"
                        }
                    }
                },
            }],
        "menus": { //we will get back to this in a later tutorial
        }
    };
    substringy (args) {
        return args.string.substring(args.num1 - 1, args.num2);
    };
}
Scratch.extensions.register(new MyBlocks());
