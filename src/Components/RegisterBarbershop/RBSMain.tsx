import React, { Component } from "react";
import StepperHeader from "../Stepper/StepperHeader";
import { ADD_BARBERSHOP_STEPS } from "./constants";
import { Switch, Route } from "react-router-dom";
import RBSFormRegister from "./RBSFormRegister";

interface RBSMainProps {
    currentStep: number;
}

class RBSMain extends Component<RBSMainProps, {}> {

    render() {
        return (
            <div>
                <StepperHeader currentStep={this.props.currentStep} stepLabels={ADD_BARBERSHOP_STEPS}/>
                <Switch>
                    <Route path="/createshop/register">
                        <RBSFormRegister/>
                    </Route>
                    <Route path="/createshop/hours"></Route>
                    <Route path="/createshop/confirm"></Route>
                </Switch>
            </div>
        );
    }
}

export default RBSMain;