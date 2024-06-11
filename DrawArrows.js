import CutArrow from "./CutArrow";
import DribbleArrow from "./DribbleArrow";
import ScreenArrow from "./ScreenArrow";

export const drawArrowsBetweenTwoPhases = (oldPhase, currentPhase) => {
    return currentPhase.map((element, index) => {
        if (element.x !== oldPhase[index].x || element.y !== oldPhase[index].y) {
            switch (element.action) {
                case 1:
                    return (
                        <CutArrow
                            key={index}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={element.x}
                            y1={element.y}
                        />
                    );
                case 2:
                    return (
                        <DribbleArrow
                            key={index}
                            x0={oldPhase[index].x}
                            y0={oldPhase[index].y}
                            x1={element.x}
                            y1={element.y}
                        />
                    );
                case 3:
                    return (
                        <ScreenArrow
                            key={index}
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
};
