import React from 'react'
import styled from 'styled-components'
import { Text, ButtonLink, Accordion, AccordionSummary, AccordionDetails } from '@gnosis.pm/safe-react-components'

import { TxParameters } from 'src/routes/safe/container/hooks/useTransactionParameters'

const TxParameterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const AccordionDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const StyledText = styled(Text)`
  margin: 8px 0 0 0;
`

const StyledButtonLink = styled(ButtonLink)`
  padding-left: 0;
  margin: 8px 0 0 0;

  > p {
    margin-left: 0;
  }
`

type Props = {
  txParameters: TxParameters
  onEdit: () => void
  compact?: boolean
}

export const TxParametersDetail = ({ onEdit, txParameters, compact = true }: Props): React.ReactElement => (
  <Accordion {...compact}>
    <AccordionSummary>
      <Text size="lg">Advanced options</Text>
    </AccordionSummary>
    <AccordionDetails>
      <AccordionDetailsWrapper>
        <StyledText size="md" color="placeHolder">
          Safe transactions parameters
        </StyledText>

        <TxParameterWrapper>
          <Text size="lg" color="text">
            Safe nonce
          </Text>
          <Text size="lg" color="text">
            {txParameters.safeNonce}
          </Text>
        </TxParameterWrapper>

        <TxParameterWrapper>
          <Text size="lg" color="text">
            SafeTxGas
          </Text>
          <Text size="lg" color="text">
            {txParameters.safeTxGas}
          </Text>
        </TxParameterWrapper>

        <TxParameterWrapper>
          <StyledText size="md" color="placeHolder">
            Ethereum transaction parameters
          </StyledText>
        </TxParameterWrapper>

        <TxParameterWrapper>
          <Text size="lg" color="text">
            Ethereum nonce
          </Text>
          <Text size="lg" color="text">
            {txParameters.ethNonce}
          </Text>
        </TxParameterWrapper>

        <TxParameterWrapper>
          <Text size="lg" color="text">
            Ethereum gas limit
          </Text>
          <Text size="lg" color="text">
            {txParameters.ethGasLimit}
          </Text>
        </TxParameterWrapper>

        <TxParameterWrapper>
          <Text size="lg" color="text">
            Ethereum gas price
          </Text>
          <Text size="lg" color="text">
            {txParameters.ethGasPrice}
          </Text>
        </TxParameterWrapper>

        <StyledButtonLink color="primary" textSize="xl" onClick={onEdit}>
          Edit
        </StyledButtonLink>
      </AccordionDetailsWrapper>
    </AccordionDetails>
  </Accordion>
)