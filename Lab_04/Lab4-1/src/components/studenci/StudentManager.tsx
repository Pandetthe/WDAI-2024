import { useState } from 'react';
import { Student } from './Studenci';
import Dodawanie from './Dodawanie';

export default function StudentManager(): JSX.Element {
  const [students, setStudents] = useState<Student[]>([
    { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2020 },
    { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2021 },
    { imie: 'Piotr', nazwisko: 'Wiśniewski', rocznik: 2019 },
  ]);

  const addStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dodawanie onAddStudent={addStudent} />
    </div>
  );
}