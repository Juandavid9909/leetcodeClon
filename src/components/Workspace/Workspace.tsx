import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Split from "react-split";

const Workspace = () => {
    return (
        <Split className="split" minSize={ 0 }>
            <ProblemDescription />

            <div>Code editor</div>
        </Split>
    );
}

export default Workspace;