import CutArrow from "./CutArrow";
import DribbleArrow from "./DribbleArrow";
import ScreenArrow from "./ScreenArrow";
import PassArrow from "./PassArrow";
import {ACTIONS} from "./Constants";


export const drawArrowsBetweenTwoPhases = (oldPhase, currentPhase) => {
    let arrows = currentPhase.map((element, index) => {
        if (element.x !== oldPhase[index].x || element.y !== oldPhase[index].y) {
            switch (element.action) {
                case ACTIONS.CUT:
                    return (
                        <CutArrow
                            key={`cut-${index}`}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={element.x}
                            y1={element.y}
                        />
                    );
                case ACTIONS.DRIBBLE:
                    return (
                        <DribbleArrow
                            key={`dribble-${index}`}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={element.x}
                            y1={element.y}
                        />
                    );
                case ACTIONS.SCREEN:
                    return (
                        <ScreenArrow
                            key={`screen-${index}`}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={element.x}
                            y1={element.y}
                        />
                    );
                default:
                    return null;
            }
        } else {
            return null;
        }
    }).filter(arrow => arrow !== null); // Filter out null values


    const passArrows = currentPhase.map((element, index) => {
        if (element.ball === true && oldPhase[index].ball === false) {
            const oldCircleWithBall = oldPhase.find(circle => circle.ball === true);
            if (oldCircleWithBall) {
                if (element.action===0 || element.action === ACTIONS.DRIBBLE) {
                    return (
                        <PassArrow
                            key={`pass-${index}`}
                            x0={oldCircleWithBall.x}
                            y0={oldCircleWithBall.y}
                            x1={oldPhase[index].x}
                            y1={oldPhase[index].y}
                        />
                    );
                }
                else {
                    return (
                        <PassArrow
                            key={`pass-${index}`}
                            x0={oldCircleWithBall.x}
                            y0={oldCircleWithBall.y}
                            x1={element.x}
                            y1={element.y}
                        />
                    );
                }
            }
        }
        return null;
    }).filter(arrow => arrow !== null);

    return arrows.concat(passArrows);
};
