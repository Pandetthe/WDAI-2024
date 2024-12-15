export interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

export default function Studenci(): JSX.Element {
  const Students: Student[] = [
    { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2020 },
    { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2021 },
    { imie: 'Piotr', nazwisko: 'Wiśniewski', rocznik: 2019 },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Rocznik</th>
        </tr>
      </thead>
      <tbody>
        {Students.map((student, index) => (
          <tr key={index}>
            <td>{student.imie}</td>
            <td>{student.nazwisko}</td>
            <td>{student.rocznik}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}