// 

export default class FlagEngine {
    flagSrc = '/flags/';

    constructor(flagSrc) {
        if(flagSrc !== undefined)
        this.flagSrc = flagSrc;
    }

    getFlagSrcByName(flagName) {
        return `${this.flagSrc}${String(flagName).toLowerCase()}.png`;
    }

    checkFlag(flagName) {
        return this.flags[flagName] === true;
    }

    clearFlag(flagName) {
        this.flags[flagName] = false;
    }
}