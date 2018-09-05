import { SET_HALL_SCHEMA } from "../types";

const createHall = payload => {
  const fillRows = amount => {
    const rows = [];
    for (let index = 0; index < amount; index++) {
      rows.push({
        No: index + 1,
        seats: fillSeats(payload.SeatsInRow)
      });
    }
    return rows;
  };

  const fillSeats = amount => {
    const seats = [];
    for (let index = 0; index < amount; index++) {
      seats.push({
        No: index + 1,
        reservation: [
          {
            reserved: false,
            price: payload.SeatPrice
          }
        ]
      });
    }
    return seats;
  };
  return {
    type: SET_HALL_SCHEMA,
    payload: {
      theaterId: payload.theater,
      No: payload.No,
      rows: fillRows(payload.RowsAmount)
    }
  };
};

export default payload => dispatch => {
  const hall = createHall(payload);
  dispatch(hall);
};
