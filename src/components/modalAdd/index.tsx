import { useState } from "react";
import "./style.css";
import { useAddItemMutation } from "../../api";

interface ModalProps {
  handleCloseModal: () => void;
}

export function ModalCreate({ handleCloseModal }: ModalProps) {
  const [name, setName] = useState("");
  const [measurementUnits, setMeasurementUnits] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [addItemMutation] = useAddItemMutation();

  const handleAddItem = async () => {
    try {
      const newItem = { name, measurementUnits, code, description };
      const response = await addItemMutation({ newItem });
      console.log("Элемент успешно создан");
      handleCloseModal();
    } catch (error) {
      console.error("Произошла ошибка при создании элемента", error);
    }
  };

  return (
    <div className="modal">
      <div>
        <div className="modal-header">
          <button className="modal-header-btn">
            <img src="home.svg" alt="home" />
          </button>
          <button className="modal-header-btn" onClick={handleCloseModal}>
            <img src="x-02.svg" alt="X" />
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-content-box">
            <h4 className="modal-content-box-title">Новая позиция</h4>
            <p className="modal-content-box-p">
              Заполните все поля для создания новой номенклатуры
            </p>
          </div>
          <div className="modal-content-box">
            <h4 className="modal-content-box-title">Название</h4>
            <input
              className="modal-content-box-input"
              type="text"
              placeholder="название"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-content-box">
            <h4 className="modal-content-box-title">Единицы измерения</h4>
            <input
              className="modal-content-box-input"
              type="text"
              value={measurementUnits}
              onChange={(e) => setMeasurementUnits(e.target.value)}
            />
          </div>
          <div className="modal-content-box">
            <h4 className="modal-content-box-title">Артикул/код</h4>
            <input
              className="modal-content-box-input"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="modal-content-box">
            <h4 className="modal-content-box-title">Описание</h4>
            <textarea
              className="modal-content-box-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-footer-btn cancel" onClick={handleCloseModal}>
          Отмена
        </button>
        <button
          className="modal-footer-btn ok"
          onClick={() => handleAddItem()}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
}
