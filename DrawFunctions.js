import CutArrow from "./CutArrow";
import DribbleArrow from "./DribbleArrow";
import ScreenArrow from "./ScreenArrow";
import PassArrow from "./PassArrow";
import {ACTIONS, BASKET, DEFENDER_SIZE, DIMENSIONS, ZONE_DEFENDERS} from "./Constants";
import Defender from "./Defender";

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



export const drawManToManDefenders = (currentPhase) => {

    const unit_per_inch = 2.54 * unit_per_cm; // Conversion factor for inches
    const inches_from_element = 2.2; // Distance from the element in inches

    const defenders = currentPhase.map((element, index) => {
        const basketX = BASKET.LEFT;
        const basketY = BASKET.TOP;

        const distanceToBasket = Math.sqrt(Math.pow(basketX - element.x, 2) + Math.pow(basketY - element.y, 2));
        if (distanceToBasket === 0) return null; // Avoid division by zero

        const defenderX = element.x + (inches_from_element * unit_per_inch * (basketX - element.x) / distanceToBasket);
        const defenderY = element.y + (inches_from_element * unit_per_inch * (basketY - element.y) / distanceToBasket);

        return <Defender key={`defender-${index}`} x={defenderX} y={defenderY}/>;
    }).filter(defender => defender !== null);

    return defenders;
};

export const drawZoneDefenders = (currentPhase) => {
    const ball = currentPhase.find(player => player.ball || player.hasBall);

    const MOVE_DISTANCE = 45/414*DIMENSIONS.WIDTH;

    // Helper function to calculate new position 2 cm towards the ball
    const moveTowardsBall = (defenderX, defenderY, ballX, ballY) => {
        const deltaX = ballX - defenderX;
        const deltaY = ballY - defenderY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < MOVE_DISTANCE) {
            return { x: ballX, y: ballY };
        }

        const moveX = (deltaX / distance) * MOVE_DISTANCE;
        const moveY = (deltaY / distance) * MOVE_DISTANCE;

        return {
            x: defenderX + moveX,
            y: defenderY + moveY
        };
    };

    const defenders = [
        { position: ZONE_DEFENDERS.DOWN_LEFT, key: 1 },
        { position: ZONE_DEFENDERS.DOWN_RIGHT, key: 2 },
        { position: ZONE_DEFENDERS.MIDDLE, key: 3 },
        { position: ZONE_DEFENDERS.TOP_LEFT, key: 4 },
        { position: ZONE_DEFENDERS.TOP_RIGHT, key: 5 }
    ];

    return defenders.map((defender) => {
        const newPosition = moveTowardsBall(
            defender.position.X - DEFENDER_SIZE / 2,
            defender.position.Y,
            ball.x,
            ball.y
        );

        return (
            <Defender
                key={`defender-${defender.key}`}
                x={newPosition.x}
                y={newPosition.y}
            />
        );
    });
};




