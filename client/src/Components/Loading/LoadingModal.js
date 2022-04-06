import react from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function LoadingModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          페이지 로딩 중
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        음식점 정보를 불러오고 있습니다. 잠시만 기다려 주세요.
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;
