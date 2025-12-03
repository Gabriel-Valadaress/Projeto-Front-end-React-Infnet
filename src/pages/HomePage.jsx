import MobileNavigation from "../components/MobileNavigation";
import MobileHeader from "../components/MobileHeader";

export default function HomePage(){
    return (
        <div>
            <MobileHeader />
            <p>Home page</p>
            <MobileNavigation />
        </div>
    );
}