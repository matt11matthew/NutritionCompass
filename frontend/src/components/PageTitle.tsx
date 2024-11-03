//header bar page:
//make it a nav mar, that when logged in shows navigation tools.
//before login acts as title bar.
import {blue} from "@mui/material/colors";
import './PageTitle.css';


function PageTitle()
{
    let TitleBar;
    return(
        <div className="TitleBar">
            <h1 id="title">Nutrition Compass</h1>
        </div>
    );
}

export default PageTitle;