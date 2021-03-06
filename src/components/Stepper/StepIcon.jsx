import { StepConnector, withStyles } from "@material-ui/core";
import React from "react";
import { AddBox, CheckBox, Schedule } from "@material-ui/icons";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// styling from https://material-ui.com/components/steppers/

export const LineConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        "& $line": {
            backgroundColor: "rgba(0, 136, 122, 1)",
        },
    },
    completed: {
        "& $line": {
            backgroundColor: "rgba(0, 136, 122, 1)",
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1,
    },
})(StepConnector);

const stepIconStyles = makeStyles({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 50,
        height: 50,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: "rgba(0, 136, 122, 1)",
    },
    completed: {
        backgroundColor: "rgba(0, 136, 122, 1)",
    },
});

export function StepIcon(props) {
    const classes = stepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <AddBox />,
        2: <Schedule />,
        3: <CheckBox />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}
