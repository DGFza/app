"use client";
import { useState } from "react";
import DataJson from "../util/data.json";
import Teachjson from "../util/teacher.json";

const cyrillicToLatin = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'j',
  'з':'z','и':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o',
  'ө':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ү':'u','ф':'f',
  'х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sh','ъ':'','ы':'i','ь':'',
  'э':'e','ю':'yu','я':'ya'
};

const transliterate = (str) =>
  String(str ?? "")
    .toLowerCase()
    .split("")
    .map((c) => cyrillicToLatin[c] ?? c)
    .join("");

export default function HomePage() {
  const [query, setQuery] = useState("");

  const matches = (name) =>
    transliterate(name).includes(transliterate(query));

  const filteredStudents = DataJson.filter((test) =>
    matches(test.firstname) || matches(test.lastname)
  );


  const filteredTeachers = Teachjson.filter((teacher) =>
    matches(teacher.firstname) || matches(teacher.lastname)
  );

  const noResults =
    query.trim() !== "" &&
    filteredStudents.length === 0 &&
    filteredTeachers.length === 0;

  return (
    <div className="relative bg-white align-middle">
      <div className="border rounded-md p-4 flex flex-col justify-center">
          <p className="font-bold text-black mb-2">Search</p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Хайх... / Search..."
            className="border rounded-md p-2 text-black w-full"
          />
        </div>

      <div className="grid grid-cols-6 gap-4 p-4">
        


        {filteredStudents.map((test, index) => (
          <div key={index} className="border overflow-hidden text-ellipsis text-black bg-white rounded-md p-4">

            <div className="font-bold">
              {test.firstname}, {test.lastname}
              <div className="bg-green-500 text-center rounded-lg">student</div>
              <img className="rounded-xl" src={test.img}  />
            </div>
            <p>position: {test.job}</p>
            <p>status: {test.alive ? "Alive" : "Deceased"}</p>
            <p>Age: {test.age}</p>
            <p>Email: {test.mail}</p>
            <p>password: {test.password}</p>
            <div>
              {test.items.map((item, i) => (
                <div key={i}>
                  item: {item.name}
                  <img src={item.img}  />
                </div>
              ))}
              <button className="bg-red-600 text-white rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>

     
      {filteredTeachers.length > 0 && (
        <div className="grid grid-cols-6 gap-4 p-4">
          {filteredTeachers.map((teacher, index) => (
            <div key={index} className="border overflow-hidden text-ellipsis bg-white text-black rounded-md p-4">
              <div className="font-bold">
                {teacher.firstname}
                
                <img className="rounded-xl" src={teacher.img}  />
              </div>
              <p className="bg-blue-500 rounded-lg text-center">teacher</p>
              <p>position: {teacher.job}</p>
              <p>status: {teacher.alive ? "Alive" : "Deceased"}</p>
              <p>Email: {teacher.mail}</p>
              <p>password: {teacher.password}</p>
              <div>
                {teacher.items.map((item, i) => (
                  <div key={i}>
                    item: {item.name}
                    
                    <img src={item.img}  />
                    <p>{item.phone_number}</p>
                  </div>
                ))}
                <button className="bg-red-600 text-white rounded-md">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}


      {noResults && (
        <div className="flex items-center justify-center border rounded-md m-4 p-6">
          <p className="text-gray-500 text-lg font-medium">User not found</p>
        </div>
      )}
    </div>
  );
}