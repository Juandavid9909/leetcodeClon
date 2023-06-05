import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";

const ProblemPage = () => {
    return (
        <div>
            <Topbar problemPage={ true } />

            <Workspace />
        </div>
    );
}

export default ProblemPage;