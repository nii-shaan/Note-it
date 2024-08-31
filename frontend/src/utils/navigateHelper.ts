import { NavigateFunction} from "react-router-dom";

let navigateFunction: NavigateFunction | undefined;

export const setNavigate = (nav: NavigateFunction) => {
	navigateFunction = nav;
};

export const navigateTo = (path:string)=>{
	if(navigateFunction){
		navigateFunction(path);
	}else{
		console.log("Navigate function is not set")
	}
}
