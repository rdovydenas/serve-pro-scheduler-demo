import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  Inject,
  ResourcesDirective,
  ResourceDirective,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";

import { Ajax, L10n, loadCldr } from "@syncfusion/ej2-base";

loadCldr(
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/lt/ca-gregorian.json"),
  require("cldr-data/main/lt/numbers.json"),
  require("cldr-data/main/lt/timeZoneNames.json")
);

import {
  extend,
  Internationalization,
  isNullOrUndefined,
} from "@syncfusion/ej2-base";
import { SampleBase } from "./sample-base";
import * as dataSource from "./datasource.json";

let localeTexts;
let ajax = new Ajax("./locale.json", "GET", false);
ajax.onSuccess = (value) => {
  localeTexts = value;
};
ajax.send();
L10n.load("./locale.json", "GET", false);

L10n.load({
  lt: {
    schedule: {
      day: "Diena",
      week: "Savaitė",
      workWeek: "Šiokiadieniai",
      month: "Mėnesis",
      agenda: "Agenda",
      weekAgenda: "Week Agenda",
      workWeekAgenda: "Work Week Agenda",
      monthAgenda: "Mėnesio Agenda",
      today: "Šiandien",
      noEvents: "Jokių įvykių",
      emptyContainer: "Nėra jokių įvykių šiai dienai.",
      allDay: "Visą dieną",
      start: "Pradžia",
      end: "Pabaiga",
      more: "Daugiau",
      close: "Uždaryti",
      cancel: "Nutraukti",
      noTitle: "(Nėra pavadinimo)",
      delete: "Ištrynti",
      deleteEvent: "Pašalinti įvykį",
      deleteMultipleEvent: "Pašalinti kelis įvykius",
      selectedItems: "Pasirinkti įvykiai",
      deleteSeries: "Pašalinti seriją",
      edit: "Redaguoti",
      editSeries: "Redaguoti seriją",
      editEvent: "Redaguoti įvykį",
      createEvent: "Sukurti",
      subject: "Tema",
      addTitle: "Pridėti pavadinimą",
      moreDetails: "Plačiau",
      save: "Išsaugoti",
      editContent: "Ar norite redaguoti tik šį įvykį ar visa seriją?",
      deleteRecurrenceContent:
        "Ar norite pašalinti tik šį įvykį ar visa seriją?",
      deleteContent: "Ar jūs įsitikinęs?",
      deleteMultipleContent: "Ar jūs tikrai norite pašalinti visą seriją?",
      newEvent: "Naujas įvykis",
      title: "Pavadinimas",
      location: "Lokacija",
      description: "Aprašymas",
      timezone: "Laiko zona",
      startTimezone: "Pradėti laiko zoną",
      endTimezone: "Užbaigti laiko zoną",
      repeat: "Pakartoti",
      saveButton: "Išsaugoti",
      cancelButton: "Nutraukti",
      deleteButton: "Ištrynti",
      recurrence: "Kartojimas",
      wrongPattern: "Pasikartoijmas nėra galimas",
      seriesChangeAlert:
        "Pasikeitimai atlikti tiksliem šios serijos atvėjam bus atšaukti ir įvykiai susiporuos serijoje iš naujo.",
      createError:
        "Įvykio trukmė privalo būti trumpesnė nei kiek dažnai atsikartoja. Sumažinkite trūkmę arba pakeiskite pasikartojimą.",
      recurrenceDateValidation:
        "Kai kurie mėnesiai yra trumpesni nei pasirinktos datos. Šiem mėnesiam pasikartojimas prasitęs iki paskutinės mėnesio dienos.",
      sameDayAlert: "Du tie patys įvykiai negali vykti ta pačia dieną .",
      editRecurrence: "Redaguoti kartojimą",
      repeats: "Pasikartoja",
      alert: "Dėmesio",
      startEndError: "Pasirinktas pabaigos laikas yra prieš pradžios laiką.",
      invalidDateError: "Įvestas datos formatas yra netinkamas.",
      ok: "OK",
      occurrence: "Atsitikimas",
      series: "Serija",
      previous: "Buvęs",
      next: "Kitas",
      timelineDay: "Laiko skalės diena",
      timelineWeek: "Laiko skalės savaitė",
      timelineWorkWeek: "Laiko skalės darbo savaitė",
      timelineMonth: "Laiko skalės mėnesis",
      expandAllDaySection: "Išplėsti",
      collapseAllDaySection: "Sulankstyti",
    },
    recurrenceeditor: {
      none: "Nėra",
      daily: "Kasdienis",
      weekly: "Savaitinis",
      monthly: "Mėnesinis",
      month: "Mėnesis",
      yearly: "Metinis",
      never: "Niekada",
      until: "Iki",
      count: "Rezultatas",
      first: "Pirmas",
      second: "Antras",
      third: "Trečias",
      fourth: "Ketvirtas",
      last: "Paskutinis",
      repeat: "Kartoti",
      repeatEvery: "Kartoti kiekvieną",
      on: "Kartoti per",
      end: "Pabaiga",
      onDay: "Diena",
      days: "Dienos",
      weeks: "Savaitės",
      months: "Mėnesiai",
      years: "Metai",
      every: "kiekvieną",
      summaryTimes: "laikai",
      summaryOn: "per",
      summaryUntil: "iki",
      summaryRepeat: "Kartojasi",
      summaryDay: "dienos",
      summaryWeek: "savaitės",
      summaryMonth: "Mėnesiai",
      summaryYear: "Metai",
    },
  },
});

/**
 * schedule room scheduler sample
 */
export class TimelineResource extends SampleBase {
  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.roomData, null, true);
    this.instance = new Internationalization();
    this.ownerData = [
      {
        text: "Main",
        id: 1,
        color: "#ea7a57",
        capacity: 20,
        type: "Conference",
      },
      { text: "Hall", id: 2, color: "#7fa900", capacity: 7, type: "Cabin" },
      { text: "Hall", id: 3, color: "#5978ee", capacity: 5, type: "Cabin" },
      {
        text: "Upper-hall",
        id: 4,
        color: "#fec200",
        capacity: 15,
        type: "Conference",
      },
      {
        text: "Main-desk",
        id: 5,
        color: "#df5286",
        capacity: 25,
        type: "Conference",
      },
      { text: "Hangout", id: 6, color: "#00bdae", capacity: 10, type: "Cabin" },
      {
        text: "2nd floor",
        id: 7,
        color: "#865fcf",
        capacity: 20,
        type: "Conference",
      },
      { text: "Hall", id: 8, color: "#1aaa55", capacity: 8, type: "Cabin" },
      {
        text: "IT room",
        id: 9,
        color: "#df5286",
        capacity: 30,
        type: "Conference",
      },
      {
        text: "Conference",
        id: 10,
        color: "#710193",
        capacity: 25,
        type: "Conference",
      },
    ];
  }
  getRoomName(value) {
    return value.resourceData[value.resource.textField];
  }
  getRoomType(value) {
    return value.resourceData.type;
  }
  getRoomCapacity(value) {
    return value.resourceData.capacity;
  }
  isReadOnly(endDate) {
    return endDate < new Date(2018, 6, 31, 0, 0);
  }
  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="room-name">{this.getRoomName(props)}</div>
        <div className="room-type">{this.getRoomType(props)}</div>
        <div className="room-capacity">{this.getRoomCapacity(props)}</div>
      </div>
    );
  }
  onActionBegin(args) {
    if (
      args.requestType === "eventCreate" ||
      args.requestType === "eventChange"
    ) {
      let data;
      if (args.requestType === "eventCreate") {
        data = args.data[0];
      } else if (args.requestType === "eventChange") {
        data = args.data;
      }
      if (!this.scheduleObj.isSlotAvailable(data)) {
        args.cancel = true;
      }
    }
  }
  onEventRendered(args) {
    let data = args.data;
    if (this.isReadOnly(data.EndTime)) {
      args.element.setAttribute("aria-readonly", "true");
      args.element.classList.add("e-read-only");
    }
  }
  onRenderCell(args) {
    if (args.element.classList.contains("e-work-cells")) {
      if (args.date < new Date(2018, 6, 31, 0, 0)) {
        args.element.setAttribute("aria-readonly", "true");
        args.element.classList.add("e-read-only-cells");
      }
    }
    if (
      args.elementType === "emptyCells" &&
      args.element.classList.contains("e-resource-left-td")
    ) {
      let target = args.element.querySelector(".e-resource-text");
      target.innerHTML =
        '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
    }
  }
  onPopupOpen(args) {
    let data = args.data;
    if (
      args.type === "QuickInfo" ||
      args.type === "Editor" ||
      args.type === "RecurrenceAlert" ||
      args.type === "DeleteAlert"
    ) {
      let target =
        args.type === "RecurrenceAlert" || args.type === "DeleteAlert"
          ? args.element[0]
          : args.target;
      if (
        !isNullOrUndefined(target) &&
        target.classList.contains("e-work-cells")
      ) {
        if (
          target.classList.contains("e-read-only-cells") ||
          !this.scheduleObj.isSlotAvailable(data)
        ) {
          args.cancel = true;
        }
      } else if (
        !isNullOrUndefined(target) &&
        target.classList.contains("e-appointment") &&
        this.isReadOnly(data.EndTime)
      ) {
        args.cancel = true;
      }
    }
  }
  render() {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              cssClass="timeline-resource"
              ref={(schedule) => (this.scheduleObj = schedule)}
              locale="lt"
              width="100%"
              height="650px"
              selectedDate={new Date(2021, 8, 13)}
              workHours={{ start: "08:00", end: "18:00" }}
              timeScale={{ interval: 60, slotCount: 1 }}
              resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
              eventSettings={{
                dataSource: this.data,
                fields: {
                  id: "Id",
                  subject: { title: "Įvykis", name: "Subject" },
                  location: { title: "Lokacija", name: "Location" },
                  description: { title: "Aprašymas", name: "Description" },
                  startTime: { title: "Nuo", name: "StartTime" },
                  endTime: { title: "Iki", name: "EndTime" },
                },
              }}
              eventRendered={this.onEventRendered.bind(this)}
              popupOpen={this.onPopupOpen.bind(this)}
              actionBegin={this.onActionBegin.bind(this)}
              renderCell={this.onRenderCell.bind(this)}
              group={{ enableCompactView: false, resources: ["MeetingRoom"] }}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="RoomId"
                  title="Kambario tipas"
                  name="MeetingRoom"
                  allowMultiple={true}
                  dataSource={this.ownerData}
                  textField="text"
                  idField="id"
                  colorField="color"
                ></ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option="TimelineDay" />
                <ViewDirective option="TimelineWeek" />
              </ViewsDirective>
              <Inject services={[TimelineViews, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

render(<TimelineResource />, document.getElementById("sample"));
