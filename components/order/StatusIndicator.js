import React from "react";
// import StepIndicator from 'react-native-step-indicator';
import { View } from '../helperComponents/RNmigrateHelpers';
import { BaseStyles } from '../helperComponents/BaseStyles';
import Stepper from 'react-stepper-horizontal';


export default class StatusIndicator extends React.Component {
  render() {
    const { status } = this.props;

    const labels = ["", "", ""];
    const customStyles = {
      stepIndicatorSize: 7,
      currentStepIndicatorSize: 10,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: BaseStyles.colorPrimary,
      stepStrokeWidth: 1,
      stepStrokeFinishedColor: BaseStyles.colorPrimary,
      stepStrokeUnFinishedColor: 'rgb(230, 231, 232)',
      separatorFinishedColor: BaseStyles.colorPrimary,
      separatorUnFinishedColor: 'rgb(230, 231, 232)',
      stepIndicatorFinishedColor: BaseStyles.colorPrimary,
      stepIndicatorUnFinishedColor: 'rgb(230, 231, 232)',
      stepIndicatorCurrentColor: BaseStyles.colorPrimary,
      stepIndicatorLabelFontSize: 0,
      currentStepIndicatorLabelFontSize: 0,
      stepIndicatorLabelCurrentColor: '#fff',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#fff',
      labelColor: '#fff',
      labelSize: 0,
      currentStepLabelColor: '#fff'
    };
    const getCorrespondingStatusPosition = (status) => {
      switch (status) {
        case 0:
        case 4:
        case 5:
          return -1;
        case 6:
        case 1:
          return 0;
        case 2:
        case 5:
        case 6:
        case 8:
          return 1;
        case 3:
        case 9:
        case 12:
          return 2;
      }
    };

    const currentPosition = getCorrespondingStatusPosition(status)

    return (
      <View>
        {
          status !== 4 ? (
            <Stepper
              steps={['', '', '']}
              activeStep={currentPosition}
              activeColor={BaseStyles.colorPrimary}
              completeColor={BaseStyles.colorPrimary}
              defaultColor='rgb(230, 231, 232)'
              size={7}
              defaultBorderColor='rgb(230, 231, 232)'
              completeBorderColor={BaseStyles.colorPrimary}
              activeBorderColor={BaseStyles.colorPrimary}
              defaultBarColor='rgb(230, 231, 232)'
              activeBarColor={BaseStyles.colorPrimary}
              completeBarColor={BaseStyles.colorPrimary}
              defaultBorderWidth={3}
              defaultBorderStyle="solid"
              completeBorderStyle="solid"
              activeBorderStyle="solid"
              circleFontSize={0}
              barStyle="solid"
            />
          ) : (
              <span class="text-extra-small">❌</span>
            )
        }
      </View>
    )
  }
}
