import CutArrow from "./CutArrow";
import DribbleArrow from "./DribbleArrow";
import ScreenArrow from "./ScreenArrow";
import PassArrow from "./PassArrow";
import { ACTIONS } from "./Constants";

const unit_per_cm = 10; // Define the conversion factor for your coordinate system

export const drawArrowsBetweenTwoPhases = (oldPhase, currentPhase) => {

    //the arrow finish 1 cm before the player
    const calculateAdjustedCoordinates = (x0, y0, x1, y1) => {
        const distance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        if (distance === 0) return { x1_adj: x1, y1_adj: y1 }; // Avoid division by zero

        const x1_adj = x1 - (unit_per_cm*1.5 * (x1 - x0) / distance);
        const y1_adj = y1 - (unit_per_cm*1.5 * (y1 - y0) / distance);
        return { x1_adj, y1_adj };
    };


    let arrows = currentPhase.map((element, index) => {
        if (element.x !== oldPhase[index].x || element.y !== oldPhase[index].y) {
            const { x1_adj, y1_adj } = calculateAdjustedCoordinates(oldPhase[index].x, oldPhase[index].y, element.x, element.y);
            switch (element.action) {
                case ACTIONS.CUT:
                    return (
                        <CutArrow
                            key={`cut-${index}`}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={x1_adj}
                            y1={y1_adj}
                            cx={element.cx}
                            cy={element.cy}
                        />
                    );
                case ACTIONS.DRIBBLE:
                    return (
                        <DribbleArrow
                            key={`dribble-${index}`}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={x1_adj}
                            y1={y1_adj}
                            cx={element.cx}
                            cy={element.cy}
                        />
                    );
                case ACTIONS.SCREEN:
                    return (
                        <ScreenArrow
                            key={`screen-${index}`}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={x1_adj}
                            y1={y1_adj}
                            cx={element.cx}
                            cy={element.cy}
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
        if ((element.ball === true || element.hasBall === true) && (oldPhase[index].ball === false || oldPhase[index].hasBall === false)) {
            const oldCircleWithBall = oldPhase.find(circle => circle.ball === true || circle.hasBall === true);
            if (oldCircleWithBall) {
                if (element.action === 0 || element.action === ACTIONS.DRIBBLE) {
                    return (
                        <PassArrow
                            key={`pass-${index}`}
                            x0={oldCircleWithBall.x}
                            y0={oldCircleWithBall.y}
                            x1={oldPhase[index].x}
                            y1={oldPhase[index].y}
                        />
                    );
                } else {
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


