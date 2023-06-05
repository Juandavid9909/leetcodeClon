import Playground from "./Playground/Playground";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Split from "react-split";

const Workspace = () => {
    return (
        <Split className="split" minSize={ 0 }>
            <ProblemDescription />

            <Playground />
        </Split>
    );
}

export default Workspace;