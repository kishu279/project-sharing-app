import { atom, atomFamily, selector, selectorFamily } from "recoil";
import axios from "axios";

// const dataFetchSelector = selectorFamily({
//   key: "dataFetchSelector",
//   get:
//     (token) =>
//     async ({ get }) => {},
// });

const dataFetched = atomFamily({
  key: "dataFetched",
  default: selectorFamily({
    key: "dataFetchSelector",
    get:
      (token) =>
      async ({ get }) => {
        try {
          const response = await axios.get(
            "http://localhost:3000/project/view",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return response.data.data;
        } catch (err) {
          throw err;
        }
      },
  }),
});

// const projectPid = selectorFamily({
//   key: "projectPid",
//   get:
//     ({ token, queryParams }) =>
//     ({ get }) => {
//       console.log(queryParams);
//       const datas = get(dataFetched(token));
//       // console.log(datas);

//       if (queryParams) {
//         const project = datas.find((item) => String(item.pid) === queryParams);
//         console.log(project);
//         if (!project) {
//           throw new Error("Project not found!");
//         }

//         return project;
//       } else {
//         return {};
//       }
//     },
// });

const projectPid = atomFamily({
  key: "projectpid",
  default: selectorFamily({
    key: "projectpid/Default",
    get:
      ({ token, queryParams }) =>
      ({ get }) => {
        console.log(queryParams);
        const datas = get(dataFetched(token));
        // console.log(datas);

        if (queryParams) {
          const project = datas.find(
            (item) => String(item.pid) === queryParams
          );
          console.log(project);
          if (!project) {
            throw new Error("Project not found!");
          }

          return project;
        } else {
          return {};
        }
      },
  }),
});

export { dataFetched, projectPid };
