import { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";
import { ButtonIcon } from "./ButtonIcon";
import { Gap } from "./Gap";

type Props = {
  message: string;
  visible: boolean;
  setVisible: () => void;
  onCancel: () => void;
  onConfirm: () => void;
};


export function ConfirmationModal({ message, visible, setVisible, onCancel, onConfirm }: Props) {

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={setVisible}
      presentationStyle='overFullScreen'
    >


      <Container>
        <ModalView>
          <Message>{message}</Message>
          <ButtonContainer>
            <ButtonIcon name="Cancelar" type="OUTLINE" showIcon={false} onPress={onCancel} />
            <Gap x={10} />
            <ButtonIcon name="Sim, excluir" type="SOLID" showIcon={false} onPress={onConfirm} />

          </ButtonContainer>

        </ModalView>
      </Container>

    </Modal>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0, 0.5);
  height: 100%;
  padding: 30px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const ModalView = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
  align-items: center;
  padding: 40px;
  max-width: 100%;
`;

const Message = styled.Text`
margin-bottom: 30px;
${({ theme }) => css`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.GRAY_2};
  text-align: center;
`}
`


const styles = StyleSheet.create({
  modal: {
    margin: 0, // This is the important style you need to set

  }
})