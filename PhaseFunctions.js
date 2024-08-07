// PhaseFunctions.js

export const freezeCircles = (currentPhase) => {
    return currentPhase.map(phase => ({
        ...phase,
        draggable: false,
    }));
};

export const releaseCircles = (currentPhase) => {
    return currentPhase.map(phase => ({
        ...phase,
        draggable: true,
    }));
};

export const releaseCirclesWithAction = (currentPhase) => {
    return currentPhase.map(phase => {
        if (phase.action !== 0) {
            return {
                ...phase,
                draggable: true,
            };
        }
        return phase;
    });
};

export const deleteOtherBalls = (currentPhase) => {
    return currentPhase.map(phase => ({
        ...phase,
        ball: false,
    }));
};

export const prepareNewPhase = (currentPhase) => {
    const newPhases = currentPhase.map(phase => ({
        ...phase,
        draggable: false,
        action: 0,
        cx:-1,
        cy:-1
    }));
    const phaseNumberNew = currentPhase.phaseNumber++;
    return {
        currentPhase: newPhases,
        setInitialPosition: false,
        ballBeenPassed: false,
        waitingForPass: false,
        selectedCircle: null,
        menuVisible: false,
        setBallMenuVisible: false,
        arrows: [],
        phaseNumber: phaseNumberNew
    };
};
