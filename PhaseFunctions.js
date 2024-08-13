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

export const prepareNewPhase = (state) => {
    const newPhases = state.currentPhase.map(phase => ({
        ...phase,
        draggable: false,
        action: 0,
        cx:-1,
        cy:-1,
        moved:false
    }));

    const phaseNumberNew = state.phaseNumber+1;

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
