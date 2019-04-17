import React from "react";
import { Button } from "antd";
import classNames from "classnames";

const ESButton = ({ className, clear, ...props }) => {
	const classes = classNames("es-button", className, {
		"es-button__clear": clear
	});

	return <Button className={classes} {...props} />;
};

export default ESButton;
