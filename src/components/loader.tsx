"use client";

import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
	return (
		<FadeLoader
			radius={8}
			loading={true}
			speedMultiplier={1.7}
		/>
	)
}

export default Loader;