import React, { Component } from 'react';

class SmallCalendar extends Component {

    state = {
        day: 0,
        month: null,
        year: 0,
        weekDay: 0,
        monthDays: 0
    }

    constructor() {
        super();
    }

    componentDidMount() {
        let today = new Date();  
        this.state.day = today.getDate();
        let monthNum = today.getMonth() + 1;
        this.state.month = today.toLocaleString('default', { month: "long" });
        this.state.year = today.getFullYear(); 
        
        this.state.weekDay = new Date(this.state.year, monthNum-1, 1).getDay();
        this.state.monthDays = new Date(this.state.year, monthNum, 0).getDate();

        console.log("SmallCalendar : ", this.state);
        this.setState( this.state );
    }

    fillWeekDays(week, dayNumber) {

        let retWeek = [];

        for (let i=0; i<7; i++) {
            let dayDesc = dayNumber;
            if ((week == 0 && i < this.state.weekDay) || // first week
                (dayNumber > this.state.monthDays)) // last week
                    dayDesc = '\u00A0'; else  // &nbsp;
                    dayNumber++; 
            if (dayNumber == this.state.day+1) {
                retWeek.push( <td key={week*10 + i} className="today"><a href="#">{dayDesc}</a></td> );
            } else {
                retWeek.push( <td key={week*10 + i}><span>{dayDesc}</span></td> );
            }
        }

        return retWeek;
    }

    render() {

        const {day, month, year, weekDay, monthDays} = this.state;
        let dayNumber = 1; 
        let week = 0;

        let lines = [];

        while (dayNumber <= monthDays) {
            lines.push( <tr key={week}>{ this.fillWeekDays(week, dayNumber) }</tr> );
            if (week == 0) dayNumber += 7-weekDay; else dayNumber += 7;
            week++;
        }

        console.log("line ::: ", lines);

        return (
            <section className="is-calendar">
              <div className="inner">
                <table>
                  <caption>
                    {month} {year}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" title="Sunday">S</th>
                      <th scope="col" title="Monday">M</th>
                      <th scope="col" title="Tuesday">T</th>
                      <th scope="col" title="Wednesday">W</th>
                      <th scope="col" title="Thursday">T</th>
                      <th scope="col" title="Friday">F</th>
                      <th scope="col" title="Saturday">S</th>
                    </tr>
                  </thead>
                  <tbody>
                      {lines}
                  </tbody>
                </table>
              </div>
            </section>
        )
    }
}

export default SmallCalendar;