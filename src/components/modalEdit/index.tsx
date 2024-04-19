import { useState } from "react";
import { useEditItemMutation } from "../../api";
import "../modalAdd/style.css";

interface ModalProps {
  handleCloseModalEdit: () => void;
  item: any;
}

export function ModalEdit({ handleCloseModalEdit, item }: ModalProps) {
  const [name, setName] = useState(item.name || ""); 
  const [measurementUnits, setMeasurementUnits] = useState(
    item.measurementUnits || ""
  );
  const [code, setCode] = useState(item.code || "");
  const [description, setDescription] = useState(item.description || "");
  const [editItemMutation] = useEditItemMutation();

  const handleEditItem = async () => {
    try {
      const newItem = { name, measurementUnits, code, description }; 
      const response = await editItemMutation({ id: item.id, newItem });
      console.log("Элемент успешно отредактирован");
      handleCloseModalEdit();
    } catch (error) {
      console.error("Произошла ошибка при редактировании элемента", error);
    }
  };
  return (
    <div className="modal">
      <div>
        <div className="modal-header">
          <button className="modal-header-btn">
            <img src="home.svg" alt="home" />
          </button>
          <button className="modal-header-btn" onClick={handleCloseModalEdit}>
            <img src="x-02.svg" alt="X" />
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-content-box">
            <h4 className="modal-content-box-title">Редактирование позиции</h4>
            <p className="modal-content-box-p">
              Заполните все поля для редактирования новой номенклатуры
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
        <button
          className="modal-footer-btn cancel"
          onClick={handleCloseModalEdit}
        >
          Отмена
        </button>
        <button
          className="modal-footer-btn ok"
          onClick={() => {
            handleEditItem();
          }}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
}
