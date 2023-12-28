import React from 'react';
import {OnyxEntry, withOnyx} from 'react-native-onyx';
import Form from '@components/Form';
import Picker from '@components/Picker';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import {SubStepProps} from '@hooks/useSubStep/types';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ValidationUtils from '@libs/ValidationUtils';
import getDefaultValueForReimbursementAccountField from '@pages/ReimbursementAccount/utils/getDefaultValueForReimbursementAccountField';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import {ReimbursementAccount} from '@src/types/onyx';
import {FormValues} from '@src/types/onyx/Form';
import * as OnyxCommon from '@src/types/onyx/OnyxCommon';

type TypeBusinessOnyxProps = {
    /** Reimbursement account from ONYX */
    reimbursementAccount: OnyxEntry<ReimbursementAccount>;
};

type TypeBusinessProps = TypeBusinessOnyxProps & SubStepProps;

type IncorporationType = keyof typeof CONST.INCORPORATION_TYPES;

const companyIncorporationTypeKey = CONST.BANK_ACCOUNT.BUSINESS_INFO_STEP.INPUT_KEY.INCORPORATION_TYPE;

const validate = (values: FormValues): OnyxCommon.Errors => ValidationUtils.getFieldRequiredErrors(values, [companyIncorporationTypeKey]);

function TypeBusiness({reimbursementAccount, onNext, isEditing}: TypeBusinessProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const defaultIncorporationType = getDefaultValueForReimbursementAccountField(reimbursementAccount, companyIncorporationTypeKey, '');

    return (
        // @ts-expect-error TODO: Remove this once Form (https://github.com/Expensify/App/issues/31972) is migrated to TypeScript
        <Form
            formID={ONYXKEYS.REIMBURSEMENT_ACCOUNT}
            submitButtonText={isEditing ? translate('common.confirm') : translate('common.next')}
            validate={validate}
            onSubmit={onNext}
            style={[styles.mh5, styles.flexGrow1]}
            submitButtonStyles={[styles.pb5, styles.mb0]}
        >
            <Text style={[styles.textHeadline, styles.mb3]}>{translate('businessInfoStep.selectYourCompanysType')}</Text>
            <Picker
                inputID={companyIncorporationTypeKey}
                label={translate('businessInfoStep.companyType')}
                items={Object.keys(CONST.INCORPORATION_TYPES).map((key) => ({
                    value: key,
                    label: translate(`businessInfoStep.incorporationType.${key as IncorporationType}`),
                }))}
                placeholder={{value: '', label: '-'}}
                // @ts-expect-error TODO: Remove this once Picker (https://github.com/Expensify/App/issues/25091) is migrated to TypeScript
                defaultValue={defaultIncorporationType}
                shouldSaveDraft
            />
        </Form>
    );
}

TypeBusiness.displayName = 'TypeBusiness';

export default withOnyx<TypeBusinessProps, TypeBusinessOnyxProps>({
    reimbursementAccount: {
        key: ONYXKEYS.REIMBURSEMENT_ACCOUNT,
    },
})(TypeBusiness);
