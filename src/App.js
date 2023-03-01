import React from 'react';
import './App.css';
import { Input, Button,  Modal, Checkbox, Space, message } from 'antd';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateInput: "",
      name: "",
      surname: "",
      phone: "",
      currentMonth: new Date(),
      selectedDate: new Date(),
      mail: "",
      organization: "",
      approval: false,
      openModal: false,
      eventModal: false,
      eventObject: [],
      startOver: false,
      eventList: [
        {
          adress: "Тольятти, ул. Льва Толстого 34, ст.2",
          city: "Тольятти",
          date: "2023-02-10 13:00:00",
          duration: 3,
          id: 23,
          organizator: "Дюйм",
          text: "Уважаемые партнеры! Приглашаем Вас посетить обучающий семинар по продукции Эван и MyHeat <br> Записаться можно по телефону 8(927) 268-05-52. <b>Запись обязательна: количество мест ограничено<b>",
          title: "Семинар по продукции ЭВАН и MyHeat ",
          type: false,
        },
        {
          adress: "Самара, ул. Самолетная 123",
          city: "Самара",
          date: "2023-02-09 14:00:00",
          duration: 3,
          id: 22,
          organizator: "Дюйм",
          text: "Уважаемые партнеры! Приглашаем Вас посетить обучающий семинар по продукции Эван и MyHeat <br> Записаться можно по телефону 8(927) 268-05-52. <b>Запись обязательна: количество мест ограничено<b>",
          title: "Семинар по продукции ЭВАН и MyHeat ",
          type: false,
        },
        {
          adress: "г. Екатеринбург",
          city: "Екатеринбург",
          date: "2023-02-02 00:00:00",
          duration: 2,
          id: 21,
          organizator: "Ревитех",
          text: "Уважаемые партнеры! Приглашаем Вас посетить обучающий семинар по продукции MyHeat <br> Дата и время уточняется ",
          title: "Семинар по продукции MyHeat ",
          type: false,
        },
        {
          adress: "г. Челябинск, ул. Лесопарковая, д.6, Отель \"Парк- Сити\", зал \"Форум\"",
          city: "Челябинск",
          date: "2023-03-01 10:00:00",
          duration: 3,
          id: 20,
          organizator: "STIMEK",
          text: "Уважаемые партнеры! Приглашаем Вас посетить обучающий семинар по продукции MyHeat. <br> Для регистрации перейдите по <a href=\"https://stimek.ru/seminars/\">ссылке</a>",
          title: "Семинар по продукции MyHeat ",
          type: false,
        },
        {
          adress: "",
          city: "Уфа",
          date: "2023-03-05 10:00:00",
          duration: 4,
          id: 19,
          organizator: "ЦентрОтопления",
          text: "Уважаемые партнеры! Приглашаем Вас посетить обучающий семинар по продукции MyHeat",
          title: "СервисФест",
          type: false,
        },
        {
          adress: "",
          city: null,
          date: "2023-02-20 11:00:00",
          duration: 2,
          id: 17,
          organizator: "MyHeat",
          text: "Уважаемые партнеры! Приглашаем Вас посетить обучающий вебинар по продукции MyHeat",
          title: "Автоматизация и диспетчеризация систем отопления",
          type: true,
        },
        {
          adress: "г. Набережные Челны, ул. Абдуллы Курбанова, 1а. База отдыха \"Агдаш\"",
          city: "Набережные Челны",
          date: "2023-02-22 12:00:00",
          duration: 5,
          id: 18,
          organizator: "ЦентрОтопления",
          text: "Приглашаем всех сервисных специалистов Набережных Челнов (и не только) вступить в сообщество, в котором мы объединяем людей, связанных общими интересами. Абсолютно разных людей, но находящихся на одной волне, понимающих друг друга с полуслова и всегда готовых поделиться своим опытом в сфере обслуживания газового оборудования.",
          title: "СервисФест",
          type: false,
        },
      ]
    }
  }

  clearForm() {
    this.setState({
      name: "",
      surname: "",
      phone: "",
      mail: "",
      organization: "",
      approval: false
    });
  }

  checkFields() {
    if (this.state.name !== "" && this.state.surname !== "" && this.state.approval === true) {
      this.setState({ openModal: false });
      this.clearForm();
      message.success("Запись прошла успешно", [3.5]);
    } else {
      message.error("Заполните поля: Имя и Фамилия. А так же вы должны быть согласны с условиями лицензионного соглашения", [3.5]);
    }
  }

  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }
  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div style={{cursor: 'pointer'}} onClick={this.prevMonth}>
            <div>←</div>
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div style={{cursor: 'pointer'}} className="col col-end" onClick={this.nextMonth}>
          <div>→</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "eeee";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
          >
            {
              this.state.eventList.find(item => item.date.indexOf(dayjs(cloneDay).locale('ru').format('YYYY-MM-DD')) !== -1) !== undefined ? 
              <div>
                <span className="number">{formattedDate}</span>
                <div className="calendar_event" onClick={() => {this.setState({eventModal: true, eventObject: this.state.eventList.find(item => item.date.indexOf(dayjs(cloneDay).locale('ru').format('YYYY-MM-DD')) !== -1)})}}>{this.state.eventList.find(item => item.date.indexOf(dayjs(cloneDay).locale('ru').format('YYYY-MM-DD')) !== -1).title}</div>
              </div>
              :
              <span className="number">{formattedDate}</span>
            }
            
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
     
    if (this.state.startOver === false) {
      this.state.eventList.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      this.state.eventList.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return (
      <div className='content'>
        <div className='events'>
          <Button type="text" className='fixed_btn' onClick={() => { this.setState({ startOver: this.state.startOver === false ? true : false }) }}>{this.state.startOver === false ? "Сортировка: c начала года" : "Сортировка: c конца года"}</Button>
          {
            this.state.eventList.map((item, index) => {
              return (
                <div className='event_item' key={"event_item" + index}>
                  <div>
                    <div>{dayjs(item.date).locale('ru').format('D MMMM YYYY в HH:mm:ss МСК')}, {item.type === true ? "Дистанционно" : item.city}</div>
                    <b>{item.title}</b>
                    <div dangerouslySetInnerHTML={{ __html: item.text }} />
                    <div>Организатор: {item.organizator}</div>
                  </div>
                  <div>
                    <Button onClick={() => { this.setState({ openModal: true }) }} type="primary">Запись</Button>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className='calendar'>
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>

        <Modal title={"Запись на мероприятие"} open={this.state.openModal} onOk={() => { this.checkFields(); }} onCancel={() => { this.setState({ openModal: false }); this.clearForm(); }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Input placeholder="Имя" name="name" value={this.state.name} onChange={this.onChange.bind(this)} />
            <Input placeholder="Фамилия" name="surname" value={this.state.surname} onChange={this.onChange.bind(this)} />
            <Input placeholder="Телефон" name="phone" value={this.state.phone} onChange={this.onChange.bind(this)} />
            <Input placeholder="Email" name="mail" value={this.state.mail} onChange={this.onChange.bind(this)} />
            <Input placeholder="Организация" name="organization" value={this.state.organization} onChange={this.onChange.bind(this)} />
            <Checkbox checked={this.state.approval} onChange={() => { this.setState({ approval: this.state.approval === false ? true : false }) }}>Я согласен с условиями <a href='https://mhtest.ru/license-agreement'>Лицензионного соглашения</a> и даю согласие на обработку моих персональных данных.</Checkbox>
          </Space>
        </Modal>

        <Modal title={this.state.eventObject.title} open={this.state.eventModal} okText={"Запись"} cancelText={"Закрыть"} onOk={() => { this.setState({ eventModal: false, eventObject: [], openModal: true }) }} onCancel={() => { this.setState({ eventModal: false, eventObject: [] }) }}>
          <div>{dayjs(this.state.eventObject.date).locale('ru').format('D MMMM YYYY в HH:mm:ss МСК')}, {this.state.eventObject.type === true ? "Дистанционно" : this.state.eventObject.city}</div>
          <div dangerouslySetInnerHTML={{ __html: this.state.eventObject.text }} />
          <div>Организатор: {this.state.eventObject.organizator}</div>
        </Modal>
      </div>
    );
  }

}