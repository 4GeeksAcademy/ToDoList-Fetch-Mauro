import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { ExampleFetch, ExampleFetchComplex } from "./ExampleFetchComplex";
import { ToDoList } from "./ToDo_React_Fecth";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<ExampleFetchComplex />
			<ToDoList />
		</div>
	);
};

export default Home;
