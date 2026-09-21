const {
  useEffect,
  useMemo,
  useRef,
  useState
} = React;

// ========== LOGO (3DVortex wordmark, currentColor so it follows --ink) ==========
const LOGO_SVG = `<svg viewBox="101.97 422.65 796.06 154.7" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><clipPath id="a"><path d="M396 440h107v96H396Zm0 0"/></clipPath><clipPath id="b"><path d="M446.16 441.633c-8.012 1.316-15.855 4.277-22.683 8.558l-2.625 1.723-2.426 1.746a60 60 0 0 0-4.82 4.027c-3.168 2.926-5.95 6.079-8.27 9.368a50 50 0 0 0-5.8 11.035c-1.407 3.68-2.27 7.742-2.571 12.078-.524 7.906 1.45 16.086 5.55 23.031a47.4 47.4 0 0 0 6.895 9.121l1.48 1.477.544.484c.73.668 1.41 1.2 2.218 1.824 1.297 1.004 2.754 1.957 4.59 3 5.844 3.31 12.504 5.305 19.258 5.778 5.64.426 11.418-.285 16.648-2.008a41 41 0 0 0 4.645-1.758 49 49 0 0 1-4.844 1.23c-5.058 1.06-10.676 1.184-16.148.34a42.8 42.8 0 0 1-8.828-2.386c-3.25-1.27-6.051-2.7-8.559-4.371-1.617-1.086-2.871-2.028-3.95-2.961-.581-.508-1.25-1.098-1.796-1.664-.395-.375-1.305-1.34-1.738-1.903-2.313-2.726-4.258-5.597-5.75-8.484-1.711-3.34-2.907-6.645-3.551-9.828-.73-3.63-.95-7.18-.645-10.555.582-6.953 3.22-13.937 7.63-20.191a54.3 54.3 0 0 1 7.363-8.434c1.496-1.418 3.128-2.746 4.226-3.62l1.152-.888 2.344-1.683 1.137-.758a61.7 61.7 0 0 1 9.867-5.191c3.254-1.344 6.774-2.426 10.465-3.215 6.852-1.434 14.055-1.645 20.848-.618 6.246.938 12.449 2.934 17.933 5.778 2.863 1.46 5.32 3.164 7.145 4.488 1.898 1.356 3.75 2.926 5.824 4.942a62 62 0 0 1 3.855 4.222 48 48 0 0 0-3.246-4.55 49.9 49.9 0 0 0-12.242-11.016 58 58 0 0 0-8.535-4.5c-3.078-1.297-6.422-2.352-9.945-3.133a59.8 59.8 0 0 0-12.707-1.352c-3.328 0-6.672.278-9.938.817"/></clipPath><clipPath id="c"><path d="M404 464h107v96H404Zm0 0"/></clipPath><clipPath id="d"><path d="M461.555 465.555c-2.493.468-4.985 1.187-7.625 2.195a44 44 0 0 0-4.59 2.023 55 55 0 0 1 4.844-1.507c5.34-1.403 10.836-1.79 16.039-1.121 6.054.785 11.976 3.136 17.129 6.808 5.367 3.785 9.996 9.184 13.03 15.195 3.184 6.36 4.505 13.422 3.813 20.434-.144 1.82-.496 3.617-.855 5.277-.445 1.723-.938 3.5-1.606 5.23a43.6 43.6 0 0 1-5.117 9.723 52.4 52.4 0 0 1-7.258 8.45c-1.156 1.097-2.488 2.246-4.183 3.605-.246.211-.606.477-.965.742l-1.16.856v.676l-1 .03-1.504 1.005a61.6 61.6 0 0 1-9.871 5.144c-3.285 1.344-6.801 2.41-10.453 3.176-6.828 1.399-14.008 1.59-20.797.559-6.242-.953-12.422-2.961-17.883-5.809-2.93-1.5-5.469-3.277-7.117-4.484-1.903-1.364-3.805-2.98-5.809-4.938a65 65 0 0 1-3.82-4.187 50 50 0 0 0 3.215 4.511 49.8 49.8 0 0 0 12.199 11.004 57 57 0 0 0 8.5 4.508c3.059 1.3 6.394 2.363 9.914 3.149 7.297 1.597 15.125 1.808 22.59.601 7.992-1.281 15.828-4.207 22.664-8.453l2.64-1.719 1.446-1.023c.305-.211.605-.422.937-.688a60 60 0 0 0 4.852-4.062c3.121-2.91 5.875-6.078 8.18-9.414 4.902-7.164 7.765-15.13 8.277-23.031.152-1.782.156-3.715.012-6.122-.223-2.386-.504-4.226-.907-5.921-.898-3.989-2.316-7.696-4.222-11.036a44 44 0 0 0-6.848-9.175l-1.344-1.336a19 19 0 0 0-.609-.575 43 43 0 0 0-2.16-1.851c-1.559-1.25-3.016-2.274-4.465-3.14a40.8 40.8 0 0 0-9.578-4.317 41 41 0 0 0-9.656-1.617 44 44 0 0 0-1.762-.035c-2.442 0-4.82.218-7.117.66"/></clipPath><clipPath id="e"><path d="M415 461h47v63h-47Zm0 0"/></clipPath><clipPath id="f"><path d="M443.441 462.188c-2.449.558-5.043 1.464-7.718 2.69-.473.235-.985.509-1.508.786l-2.59 1.524-1.953 1.246-3.195 2.539c-.149.136-.344.332-.54.523l-2.648 2.703c-1.062 1.274-2.16 2.586-3.027 4.031l-.086.141c-.52.785-1.012 1.531-1.371 2.328-.16.344-.32.664-.489.988-.296.583-.574 1.137-.777 1.7l-1.043 2.883-.7 3.015c-.737 3.942-.597 8.192.423 12.235a30.4 30.4 0 0 0 5.515 11.085l2.621 2.934.524.465c.125.105.25.223.375.34.2.18.394.36.656.566l.567.445c.675.532 1.375 1.082 1.988 1.446l1.367.867c.242.133.555.297.867.457l.418.219a30.8 30.8 0 0 0 10.836 3.3c3.574.356 7.04.137 9.961-.632l.11-.028c.53-.093 1.054-.27 1.609-.46l.457-.153c.21-.074.445-.148.68-.226.449-.153.89-.297 1.312-.47a32 32 0 0 1 1.223-.581c.8-.371 1.554-.723 2.203-1.114l.941-.593q.68-.426 1.301-.828l-2.527.832c-.77.23-1.547.402-2.297.566-.426.094-.86.188-1.297.297l-.11.023q-.58.087-1.171.157-.376.045-.758.097l-.438.059c-.468.062-1.004.137-1.57.137l-.195-.004c-.438.007-.93.023-1.43.043l-.523.02c-.54-.016-.977-.052-1.418-.083-.274-.02-.543-.043-.813-.058-.57-.012-1.156-.114-1.719-.207l-1.761-.286-1.02-.27a29.9 29.9 0 0 1-8.86-3.82l-1-.656-1.019-.77c-.453-.308-.836-.656-1.18-.964-.171-.152-.34-.309-.527-.457a12 12 0 0 1-.734-.723l-.824-.847h.003l-.05-.051.004-.008-.532-.57.028-.07-1.39-1.716c-2.063-2.957-3.5-6.03-4.267-9.132-.828-3.133-1.027-6.493-.585-9.965.378-2.996 1.414-6.172 3.078-9.442.457-1.015 1.078-1.964 1.68-2.878.269-.41.534-.817.784-1.231l.098-.14 1.692-2.149c.164-.211.328-.422.5-.617l2.332-2.524 2.199-1.957-.035-.117 2.933-2.242c2.317-1.652 4.551-3.012 6.684-4.078a31 31 0 0 1 1.836-.863c.156-.07.304-.137.457-.204-.828.137-1.684.286-2.567.497"/></clipPath><clipPath id="g"><path d="M445 476h48v63h-48Zm0 0"/></clipPath><clipPath id="h"><path d="m455.902 476.969-.46.101c-.227.051-.458.098-.676.16l-3.094 1.047q-.575.275-1.133.532c-.855.398-1.66.773-2.375 1.175l-.754.48q-.77.476-1.469.923l2.532-.825c.808-.222 1.59-.398 2.39-.578.41-.09.832-.183 1.25-.285l.149-.027 2.855-.363a9 9 0 0 1 .848-.043l.34-.004c.351-.004.664-.016.972-.028.368-.015.739-.03 1.11-.03l.129.003 2.12.152c.5.02 1 .11 1.485.192q.375.072.75.125c.719.078 1.414.265 2.082.445l.27.07c3.074.797 6.144 2.168 8.867 3.961.445.258.875.594 1.293.918.219.172.441.344.668.504.265.18.476.367.68.563.074.066.148.14.234.207l.957.863 1.129 1.168-.211.21.223-.202.648.668-.047.12.774.954c.28.336.578.688.824 1.11 1.968 2.788 3.394 6 4.113 9.288.754 3.192.844 6.598.27 10.098-.598 3.457-1.727 6.629-3.356 9.445-.273.59-.613 1.098-.945 1.586a22 22 0 0 0-.364.551l-.34.52c-.34.527-.69 1.074-1.144 1.593l-1.64 2.043-2.102 2.266c-.262.258-.48.445-.695.633l-1.7 1.5.032.11-3.93 2.905c-2.266 1.633-4.61 2.801-6.676 3.832l-.12.06c-.478.202-.853.362-1.224.523-.398.171-.789.34-1.171.496q.673-.096 1.418-.227c.406-.066.828-.14 1.257-.203 2.387-.55 5.059-1.25 7.766-2.5l.379-.16c.238-.102.476-.203.715-.313l3.215-1.758 2.402-1.539c.203-.132.41-.261.621-.414l1.047-.824a73 73 0 0 0 2.183-1.777l1.957-1.942c.63-.582 1.157-1.238 1.715-1.933l.118-.145q.24-.306.503-.629c.446-.543.864-1.054 1.192-1.605.199-.317.379-.59.562-.867.368-.555.735-1.118 1.07-1.7l.048-.105 1.292-2.617c.711-1.719 1.457-3.668 1.844-5.707.903-4.063.89-8.364-.023-12.477-.977-4.207-2.82-8.117-5.332-11.293l-.07-.097c-.243-.368-.555-.72-.887-1.09l-2.18-2.387-1.05-.945a7 7 0 0 0-.536-.446l-.7-.546c-.128-.094-.288-.22-.448-.344-.266-.207-.528-.418-.782-.57l-.527-.34c-.715-.461-1.39-.903-2.09-1.243-3.422-1.847-7.195-3.054-10.969-3.511a32 32 0 0 0-3.703-.215c-2.27 0-4.437.254-6.375.754"/></clipPath><clipPath id="i"><path d="M124 449h67v98h-67Zm0 0"/></clipPath><clipPath id="j"><path d="M129.613 449.477v4.242h52.82l-35.581 40.77 1.37 2.745h3.97q7.388 0 13.476 1.368 6.09 1.37 10.539 4.105c2.965 1.828 5.27 4.152 6.91 6.98s2.465 6.208 2.465 10.125v.278c0 3.281-.71 6.316-2.121 9.097a22.9 22.9 0 0 1-5.68 7.184q-3.562 3.012-8.347 4.652-4.793 1.643-10.125 1.645c-6.664 0-12.614-1.438-17.86-4.313q-7.87-4.307-13.344-11.562l-3.554 3.012q5.743 7.523 14.433 12.312 8.69 4.793 20.188 4.793c4.191 0 8.164-.664 11.902-1.988q5.608-1.981 9.856-5.54a27.2 27.2 0 0 0 6.77-8.484q2.53-4.926 2.53-10.949v-.273q.001-6.7-2.734-11.63-2.743-4.928-7.594-8.21c-3.238-2.191-7.093-3.852-11.562-4.996q-6.709-1.709-14.781-1.848l35.168-40.23v-3.285Zm0 0"/></clipPath><clipPath id="k"><path d="M212 449h83v97h-83Zm0 0"/></clipPath><clipPath id="l"><path d="M212.398 449.477v95.789h31.153q11.2.001 20.558-3.696 9.356-3.69 16.121-10.125c4.504-4.289 7.993-9.328 10.45-15.12 2.46-5.794 3.687-12.063 3.687-18.817v-.274c0-6.75-1.226-13.02-3.687-18.816-2.457-5.79-5.946-10.828-10.45-15.117q-6.765-6.436-16.12-10.13-9.36-3.695-20.56-3.694Zm4.657 4.242h26.547q10.397 0 18.882 3.422c5.657 2.28 10.489 5.382 14.504 9.304 4.016 3.926 7.14 8.555 9.38 13.89q3.346 8.007 3.347 17.036v.274c0 6.02-1.09 11.68-3.281 16.968q-3.288 7.939-9.375 13.82c-4.059 3.922-8.918 7.005-14.575 9.239-5.656 2.238-11.902 3.351-18.75 3.351h-26.68Zm0 0"/></clipPath><clipPath id="m"><path d="M528 449h77v97h-77Zm0 0"/></clipPath><clipPath id="n"><path d="M528.969 449.477v95.789h4.652v-40.918h33.938l31.199 40.918h5.887L572.758 503.8c4.379-.36 8.418-1.23 12.113-2.598q5.543-2.05 9.574-5.473a23.3 23.3 0 0 0 6.227-8.21q2.19-4.788 2.191-10.813v-.273q-.001-5.333-1.847-9.852-1.846-4.51-5.13-7.937c-2.921-2.915-6.687-5.176-11.292-6.774q-6.909-2.393-16.078-2.394Zm4.652 4.242h34.621c9.488 0 16.852 2.035 22.102 6.09 5.246 4.058 7.867 9.695 7.867 16.898v.273c0 3.38-.688 6.48-2.055 9.31q-2.052 4.239-6.02 7.32c-2.648 2.05-5.882 3.648-9.714 4.788q-5.748 1.711-13.137 1.711h-33.664Zm0 0"/></clipPath><clipPath id="o"><path d="M709.871 541.023h68.149v4.243h-68.15Zm0 0"/></clipPath><clipPath id="p"><path d="M709.871 449.477h67.465v4.242H709.87Zm0 0"/></clipPath><clipPath id="q"><path d="M709.871 494.91h61.445v4.238h-61.445Zm0 0"/></clipPath><clipPath id="r"><path d="M793 449h36v41h-36Zm0 0"/></clipPath><clipPath id="s"><path d="m793.895 449.477 32.054 40.488 2.63-3.344-29.212-37.144Zm0 0"/></clipPath><clipPath id="t"><path d="M792 449h84v97h-84Zm0 0"/></clipPath><clipPath id="u"><path d="m868.61 449.477-76.087 95.789h5.473l35.992-45.703 35.989 45.703h5.472l-38.586-48.715 37.223-47.074Zm0 0"/></clipPath><clipPath id="v"><path d="M651.715 462.754h4.656v82.512h-4.656Zm0 0"/></clipPath><clipPath id="w"><path d="M617.64 449.477h72.942v4.242h-72.941Zm34.075 4.242h4.656v.004h-4.656Zm0 0"/></clipPath><clipPath id="x"><path d="M354 449h40v85h-40Zm0 0"/></clipPath><clipPath id="y"><path d="m388.79 449.477-34.626 78.5 2.215 5.027 37.2-83.527Zm0 0"/></clipPath><clipPath id="z"><path d="M303 449h49v97h-49Zm0 0"/></clipPath><clipPath id="A"><path d="m303.813 449.477 42.964 96.472h3.832l.434-.972-2.188-4.965-.023.054-39.957-90.59Zm0 0"/></clipPath><linearGradient id="vg0" gradientUnits="userSpaceOnUse" x1="397.18" y1="0" x2="499.34" y2="0"><stop offset="0.083" stop-color="#6C9CCE"/><stop offset="0.25" stop-color="#7BA8CF"/><stop offset="0.417" stop-color="#9CC1CF"/><stop offset="0.583" stop-color="#C4DDC5"/><stop offset="0.75" stop-color="#EFF3BB"/><stop offset="0.917" stop-color="#F8F9BB"/></linearGradient><linearGradient id="vg1" gradientUnits="userSpaceOnUse" x1="407.79" y1="0" x2="509.29" y2="0"><stop offset="0.083" stop-color="#F8F9BC"/><stop offset="0.25" stop-color="#F3F4B7"/><stop offset="0.417" stop-color="#F2F4B7"/><stop offset="0.583" stop-color="#D6E8C2"/><stop offset="0.75" stop-color="#9FC3CF"/><stop offset="0.917" stop-color="#6E9DD0"/></linearGradient><linearGradient id="vg2" gradientUnits="userSpaceOnUse" x1="415.75" y1="0" x2="457.54" y2="0"><stop offset="0.083" stop-color="#9EC3CF"/><stop offset="0.25" stop-color="#C3DCCC"/><stop offset="0.417" stop-color="#DEEAC0"/><stop offset="0.583" stop-color="#F2F4BA"/><stop offset="0.75" stop-color="#F2F4B7"/><stop offset="0.917" stop-color="#F4F6B9"/></linearGradient><linearGradient id="vg3" gradientUnits="userSpaceOnUse" x1="447.59" y1="0" x2="491.38" y2="0"><stop offset="0.25" stop-color="#E6EDBC"/><stop offset="0.417" stop-color="#D8E7C2"/><stop offset="0.583" stop-color="#C2DDC7"/><stop offset="0.75" stop-color="#ABCBCC"/><stop offset="0.917" stop-color="#95BBD1"/></linearGradient></defs><g clip-path="url(#a)"><g clip-path="url(#b)"><path fill="url(#vg0)" d="m481.508 577.84 59.062-118.125-122.863-61.43-59.062 118.125Zm0 0"/></g></g><g clip-path="url(#c)"><g clip-path="url(#d)"><path fill="url(#vg1)" d="m401.89 464.98 3.008 97.88 108.375-3.333-3.007-97.875Zm0 0"/></g></g><g clip-path="url(#e)"><g clip-path="url(#f)"><path fill="url(#vg2)" d="m452.41 542.676 34.262-68.524-62.277-31.136-34.258 68.523Zm0 0"/></g></g><g clip-path="url(#g)"><g clip-path="url(#h)"><path fill="url(#vg3)" d="m444.023 476.273 1.961 63.836 48.407-1.484-1.961-63.84Zm0 0"/></g></g><path fill="#8EB6D1" d="M129.613 449.477v4.242h52.82l-35.578 40.77 1.368 2.745h3.968q7.389 0 13.477 1.368 6.092 1.37 10.539 4.105c2.965 1.828 5.27 4.152 6.91 6.98s2.465 6.208 2.465 10.125v.278c0 3.285-.71 6.316-2.121 9.097a22.9 22.9 0 0 1-5.68 7.184q-3.562 3.012-8.347 4.652-4.793 1.643-10.125 1.645c-6.664 0-12.614-1.438-17.86-4.313q-7.87-4.307-13.344-11.562l-3.558 3.012q5.748 7.523 14.437 12.312 8.689 4.793 20.184 4.793c4.195 0 8.168-.664 11.906-1.988 3.742-1.32 7.024-3.168 9.856-5.54a27.2 27.2 0 0 0 6.77-8.484q2.53-4.927 2.53-10.945v-.277q.001-6.702-2.734-11.63-2.743-4.928-7.594-8.21-4.858-3.286-11.562-4.996-6.709-1.706-14.781-1.848l35.171-40.23v-3.285Zm0 0"/><g clip-path="url(#i)"><g clip-path="url(#j)"><path fill="#8EB6D1" d="M190.23 546.91h-65.68v-97.433h65.68Zm0 0"/></g></g><path fill="#8EB6D1" d="M212.402 449.477v95.789h31.149q11.2.001 20.558-3.696 9.356-3.69 16.121-10.125c4.508-4.289 7.993-9.324 10.45-15.12 2.46-5.794 3.691-12.063 3.691-18.817v-.274q0-10.123-3.691-18.816c-2.457-5.793-5.942-10.828-10.45-15.117q-6.765-6.436-16.12-10.13-9.36-3.692-20.56-3.694Zm4.649 4.242h26.55q10.397 0 18.883 3.422 8.486 3.42 14.508 9.304 6.018 5.888 9.375 13.89 3.347 8.007 3.348 17.036v.274c0 6.023-1.09 11.68-3.285 16.968q-3.283 7.939-9.371 13.82c-4.059 3.922-8.918 7.005-14.575 9.239-5.656 2.238-11.902 3.351-18.746 3.351h-26.687Zm0 0"/><g clip-path="url(#k)"><g clip-path="url(#l)"><path fill="#8EB6D1" d="M294.367 545.266h-81.969v-95.79h81.97Zm0 0"/></g></g><path fill="#8EB6D1" d="M528.973 449.477v95.789h4.648v-40.918h33.938l31.199 40.918h5.887L572.758 503.8c4.379-.36 8.418-1.23 12.113-2.598q5.543-2.05 9.574-5.473a23.36 23.36 0 0 0 6.23-8.21q2.188-4.788 2.188-10.813v-.273q-.001-5.333-1.847-9.852-1.846-4.51-5.13-7.937-4.383-4.377-11.292-6.774-6.909-2.393-16.078-2.394Zm4.648 4.242h34.621c9.488 0 16.856 2.035 22.102 6.09q7.868 6.093 7.867 16.898v.273c0 3.38-.684 6.48-2.055 9.31-1.367 2.827-3.375 5.265-6.015 7.32-2.653 2.05-5.887 3.648-9.72 4.788-3.827 1.141-8.21 1.711-13.136 1.711h-33.664Zm0 0"/><g clip-path="url(#m)"><g clip-path="url(#n)"><path fill="#8EB6D1" d="M604.645 545.266h-75.672v-95.79h75.672Zm0 0"/></g></g><path fill="#8EB6D1" d="M709.871 545.266h68.149v-4.243h-68.15Zm0 0"/><g clip-path="url(#o)"><path fill="#8EB6D1" d="M778.02 545.266h-68.15v-4.243h68.149Zm0 0"/></g><path fill="#8EB6D1" d="M709.871 453.719h67.465v-4.242H709.87Zm0 0"/><g clip-path="url(#p)"><path fill="#8EB6D1" d="M777.336 453.719H709.87v-4.242h67.465Zm0 0"/></g><path fill="#8EB6D1" d="M709.871 499.148h61.445v-4.238h-61.445Zm0 0"/><g clip-path="url(#q)"><path fill="#8EB6D1" d="M771.316 499.148h-61.445v-4.238h61.445Zm0 0"/></g><path fill="#8EB6D1" d="m793.895 449.477 32.054 40.488 2.63-3.344-29.212-37.144Zm0 0"/><g clip-path="url(#r)"><g clip-path="url(#s)"><path fill="#8EB6D1" d="M828.578 489.965h-34.683v-40.488h34.683Zm0 0"/></g></g><path fill="#8EB6D1" d="m868.61 449.477-76.087 95.789H798l35.988-45.703 35.989 45.703h5.472l-38.586-48.715 37.219-47.074Zm0 0"/><g clip-path="url(#t)"><g clip-path="url(#u)"><path fill="#8EB6D1" d="M875.45 545.266h-82.927v-95.79h82.926Zm0 0"/></g></g><path fill="#8EB6D1" d="M651.715 545.266h4.656v-82.512h-4.656Zm0 0"/><g clip-path="url(#v)"><path fill="#8EB6D1" d="M656.371 545.266h-4.656v-82.512h4.656Zm0 0"/></g><path fill="#8EB6D1" d="M617.64 449.477v4.242h34.075v.004h4.656v-.004h34.211v-4.242Zm0 0"/><g clip-path="url(#w)"><path fill="#8EB6D1" d="M690.582 453.723h-72.941v-4.246h72.941Zm0 0"/></g><path fill="#8EB6D1" d="m388.79 449.477-34.626 78.5 2.215 5.027 37.2-83.527Zm0 0"/><g clip-path="url(#x)"><g clip-path="url(#y)"><path fill="#8EB6D1" d="M393.578 533.004h-39.414v-83.527h39.414Zm0 0"/></g></g><path fill="#8EB6D1" d="m303.813 449.477 42.964 96.472h3.832l.434-.972-2.188-4.965-.023.054-39.96-90.59Zm0 0"/><g clip-path="url(#z)"><g clip-path="url(#A)"><path fill="#8EB6D1" d="M351.043 545.95h-47.23v-96.473h47.23Zm0 0"/></g></g></svg>`;

// ========== IMAGES (studio renders) ==========
const P = {
  hero: "/assets/hero.jpg",
  p1_2: "/assets/p1-2.jpg",
  vs1: "/assets/viseu-1.jpg",
  vs2: "/assets/viseu-2.jpg",
  vs3: "/assets/viseu-3.jpg",
  vs4: "/assets/viseu-4.jpg",
  vs5: "/assets/viseu-5.jpg",
  cl1: "/assets/casa-lele-1.jpg",
  cl2: "/assets/casa-lele-2.jpg",
  cl3: "/assets/casa-lele-3.jpg",
  al1: "/assets/altstetten-1.jpg",
  al2: "/assets/altstetten-2.jpg",
  al3: "/assets/altstetten-3.jpg",
  lm1: "/assets/lele-model-1.jpg",
  lm2: "/assets/lele-model-2.jpg",
  lm3: "/assets/lele-model-3.jpg",
  lm4: "/assets/lele-model-4.jpg",
  lm5: "/assets/lele-model-5.jpg",
  lm6: "/assets/lele-model-6.jpg",
  lm7: "/assets/lele-model-7.jpg",
  lm8: "/assets/lele-model-8.jpg",
  lm9: "/assets/lele-model-9.jpg",
  oe1: "/assets/oerlikon-1.jpg",
  oe2: "/assets/oerlikon-2.jpg",
  gm1: "/assets/graffio-model-1.jpg",
  gm2: "/assets/graffio-model-2.jpg",
  p1_3: "/assets/p1-3.jpg",
  p2_1: "/assets/p2-1.jpg",
  p2_2: "/assets/p2-2.jpg",
  p2_3: "/assets/p2-3.jpg",
  p2_4: "/assets/p2-4.jpg",
  p2_5: "/assets/p2-5.jpg",
  p2_6: "/assets/p2-6.jpg",
  p2_7: "/assets/p2-7.jpg",
  p2_8: "/assets/p2-8.jpg",
  p3_1: "/assets/p3-1.jpg",
  p3_2: "/assets/p3-2.jpg",
  p3_3: "/assets/p3-3.jpg",
  p5_1: "/assets/p5-1.jpg",
  p5_2: "/assets/p5-2.jpg",
  p5_3: "/assets/p5-3.jpg",
  p5_4: "/assets/p5-4.jpg",
  pult: "/assets/pult-1.jpg",
  // EFH Maria: el boceto a lapiz es la imagen base y el render de IA el
  // que se descubre con el barrido. Mismo encuadre y mismo tamano, si no
  // la transicion salta.
  mrs: "/assets/maria-sketch.jpg",
  mrr: "/assets/maria-render.jpg",
  // Variantes de material del mismo encuadre. Todas salen del mismo
  // boceto, asi que el barrido cuadra igual con cualquiera.
  mrc: "/assets/maria-concrete.jpg",
  mrt: "/assets/maria-rattan.jpg",
  mrg: "/assets/maria-sage.jpg",
  // EFH Maria · Living: boceto a lapiz y ocho renders del mismo encuadre,
  // registrados contra el boceto para que el barrido cuadre (2842 x 630).
  // EFH Maria · Fassade: boceto a lapiz y dos renders registrados (2394 x 1704).
  mfs: "/assets/maria-fac-sketch.jpg",
  mf1: "/assets/maria-fac-timber.jpg",
  mf2: "/assets/maria-fac-stone.jpg",
  mls: "/assets/maria-liv-sketch.jpg",
  ml1: "/assets/maria-liv-terracotta.jpg",
  ml2: "/assets/maria-liv-oak.jpg",
  ml3: "/assets/maria-liv-evening.jpg",
  ml4: "/assets/maria-liv-terrazzo.jpg",
  ml5: "/assets/maria-liv-nordic.jpg",
  ml6: "/assets/maria-liv-olive.jpg",
  ml7: "/assets/maria-liv-coastal.jpg",
  ml8: "/assets/maria-liv-minimal.jpg",
  ph: "/assets/placeholder.svg"
};
const PN = {
  hall: "/assets/pano-hall.jpg",
  court1: "/assets/pano-court-01.jpg",
  court2: "/assets/pano-court-02.jpg",
  amb1: "/assets/pano-amb-01.jpg",
  amb2: "/assets/pano-amb-02.jpg",
  amb3: "/assets/pano-amb-03.jpg",
  amb4: "/assets/pano-amb-04.jpg"
};
// miniaturas de las panoramicas, para el menu del tour
const PNT = {
  hall: "/assets/pano-hall-t.jpg",
  court1: "/assets/pano-court-01-t.jpg",
  court2: "/assets/pano-court-02-t.jpg",
  amb1: "/assets/pano-amb-01-t.jpg",
  amb2: "/assets/pano-amb-02-t.jpg",
  amb3: "/assets/pano-amb-03-t.jpg",
  amb4: "/assets/pano-amb-04-t.jpg"
};

// recortes intermedios: mismo encuadre que ensena la tarjeta, 1600x1200.
// Evitan bajar el equirectangular completo solo para una miniatura.
const PNM = {
  hall: "/assets/pano-hall-m.jpg",
  court1: "/assets/pano-court-01-m.jpg",
  court2: "/assets/pano-court-02-m.jpg",
  amb1: "/assets/pano-amb-01-m.jpg",
  amb2: "/assets/pano-amb-02-m.jpg",
  amb3: "/assets/pano-amb-03-m.jpg",
  amb4: "/assets/pano-amb-04-m.jpg"
};

// 360° equirectangular panoramas
const PANORAMAS = [{
  id: "amb3",
  t: "Living Room",
  c: "Graffio Single-Family House",
  proj: "graffio",
  place: "Golino (TI)",
  src: PN.amb3,
  thumb: PNT.amb3,
  mid: PNM.amb3,
  yaw: 0,
  pitch: -2
}, {
  id: "amb2",
  t: "Kitchen",
  c: "Graffio Single-Family House",
  proj: "graffio",
  place: "Golino (TI)",
  src: PN.amb2,
  thumb: PNT.amb2,
  mid: PNM.amb2,
  yaw: 0,
  pitch: -2
}, {
  id: "amb4",
  t: "Bar & Lounge",
  c: "Graffio Single-Family House",
  proj: "graffio",
  place: "Golino (TI)",
  src: PN.amb4,
  thumb: PNT.amb4,
  mid: PNM.amb4,
  yaw: 0,
  pitch: -2
}, {
  id: "amb1",
  t: "Bedroom & Bath",
  c: "Graffio Single-Family House",
  proj: "graffio",
  place: "Golino (TI)",
  src: PN.amb1,
  thumb: PNT.amb1,
  mid: PNM.amb1,
  yaw: 0,
  pitch: -2
}, {
  id: "court1",
  t: "Ice Rink",
  c: "Islas Ice Rink",
  proj: "silserkugel",
  place: "St. Moritz (GR)",
  src: PN.court1,
  thumb: PNT.court1,
  mid: PNM.court1,
  yaw: 0,
  pitch: -2
}, {
  id: "court2",
  t: "Rink — Training",
  c: "Islas Ice Rink",
  proj: "silserkugel",
  place: "St. Moritz (GR)",
  src: PN.court2,
  thumb: PNT.court2,
  mid: PNM.court2,
  yaw: 0,
  pitch: -2
}, {
  id: "hall",
  t: "Restaurant",
  c: "Islas Ice Rink",
  proj: "silserkugel",
  place: "St. Moritz (GR)",
  src: PN.hall,
  thumb: PNT.hall,
  mid: PNM.hall,
  yaw: 0,
  pitch: -2
}];

// Menu de tour: las estancias del proyecto de la panoramica actual
function TourBar({
  current,
  onPick
}) {
  const rooms = PANORAMAS.filter(p => p.proj === current.proj);
  if (rooms.length < 2) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "tourbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tb-proj"
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, t(current.c)), /*#__PURE__*/React.createElement("span", {
    className: "p"
  }, current.place, t(" · 360° Tour"))), /*#__PURE__*/React.createElement("div", {
    className: "tb-rooms"
  }, rooms.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    type: "button",
    className: `tb-room ${r.id === current.id ? 'on' : ''}`,
    onClick: () => onPick(r.id)
  }, /*#__PURE__*/React.createElement(Pic, {
    src: r.thumb,
    sizes: SIZE_CHIP,
    alt: "",
    "aria-hidden": "true"
  }), t(r.t)))));
}
const PANO_BY_ID = Object.fromEntries(PANORAMAS.map(p => [p.id, p]));

// ========== PROJECTS ==========
const SERVICES = [{"k": "all", "l": "All"}, {"k": "viz", "l": "Visualization"}, {"k": "print", "l": "3D Print Model"}, {"k": "tour", "l": "360° Virtual Tour"}, {"k": "ai", "l": "AI Visualization"}];
// ========== VARIANTES DE MATERIAL ==========
// Una escena puede tener varios acabados del mismo encuadre. Todas salen del
// mismo boceto, asi que el barrido cuadra con cualquiera.
const VARIANTES_MARIA = [
  // l: lo que se lee en la pastilla — corto, para que las cuatro quepan en
  // una fila. d: el nombre completo, para el lector de pantalla y el tooltip.
  { k: "oak",      l: "Oak",      d: "Oak & white",       img: P.mrr },
  { k: "concrete", l: "Concrete", d: "Concrete & oak",    img: P.mrc },
  { k: "rattan",   l: "Rattan",   d: "Rattan & terrazzo", img: P.mrt },
  { k: "sage",     l: "Sage",     d: "Sage & blush",      img: P.mrg }
];
const VARIANTES_MARIA_LIVING = [
  { k: "terracotta", l: "Terracotta", d: "Terracotta wood",         img: P.ml1 },
  { k: "oak",        l: "Oak",        d: "Oak & steel",             img: P.ml2 },
  { k: "evening",    l: "Evening",    d: "Warm oak, evening light", img: P.ml3 },
  { k: "terrazzo",   l: "Terrazzo",   d: "Terrazzo & plaster",      img: P.ml4 },
  { k: "nordic",     l: "Nordic",     d: "Nordic oak",              img: P.ml5 },
  { k: "olive",      l: "Olive",      d: "Olive & tropical green",  img: P.ml6 },
  { k: "coastal",    l: "Coastal",    d: "Coastal light",           img: P.ml7 },
  { k: "minimal",    l: "Minimal",    d: "Minimal white",           img: P.ml8 }
];
const VARIANTES_MARIA_FACHADA = [
  { k: "timber", l: "Timber", d: "Timber attic",         img: P.mf1 },
  { k: "stone",  l: "Stone",  d: "Stone base & plaster", img: P.mf2 }
];
// Texto y ficha tecnica por proyecto (formulario de Adrian, 21-09-2026).
const INFO = {
 "graffio-viz": {
  "client": "Private client",
  "year": "2023",
  "ctx": "Preliminary design, presentation to the client",
  "sub": "A single-family house in Golino, Ticino, at preliminary-design stage",
  "desc": "Visualizations of the preliminary design for a private client in Golino. They let the client see the house in its setting and discuss the design before it was developed further."
 },
 "graffio-print": {
  "client": "Private client",
  "year": "2023",
  "ctx": "Preliminary design, presentation to the client",
  "sub": "A single-family house in Golino, Ticino, at preliminary-design stage",
  "desc": "Visualizations of the preliminary design for a private client in Golino. They let the client see the house in its setting and discuss the design before it was developed further."
 },
 "graffio-360": {
  "client": "Private client",
  "year": "2023",
  "ctx": "Preliminary design, presentation to the client",
  "sub": "A single-family house in Golino, Ticino, at preliminary-design stage",
  "desc": "Visualizations of the preliminary design for a private client in Golino. They let the client see the house in its setting and discuss the design before it was developed further."
 },
 "viseu-viz": {
  "client": "Private client",
  "year": "2023",
  "ctx": "Preliminary design, presentation to the client",
  "svc": "Exterior visualizations",
  "sub": "A single-family house in Golino, Ticino, seen from outside",
  "desc": "Exterior visualizations of the preliminary design, prepared for the presentation to the private client in Golino."
 },
 "casa-lele-viz": {
  "client": "Private client",
  "year": "2023",
  "ctx": "Final visualizations: materials and furnishings",
  "svc": "Interior and exterior visualizations, 360° virtual tour and 3D-printed model",
  "sub": "Materials and furnishings for a single-family house in Cevio, Ticino",
  "desc": "Final visualizations to decide materials and furnishings with the private client, inside and out, together with a 360° virtual tour and a 3D-printed model of the house."
 },
 "casa-lele-print": {
  "client": "Private client",
  "year": "2023",
  "ctx": "Final visualizations: materials and furnishings",
  "svc": "Interior and exterior visualizations, 360° virtual tour and 3D-printed model",
  "sub": "Materials and furnishings for a single-family house in Cevio, Ticino",
  "desc": "Final visualizations to decide materials and furnishings with the private client, inside and out, together with a 360° virtual tour and a 3D-printed model of the house."
 },
 "football-pitch-viz": {
  "client": "Colegio Jaso (private school), Pamplona",
  "year": "2024",
  "ctx": "Competition",
  "sub": "Competition entry for a sports hall for Colegio Jaso in Pamplona",
  "desc": "Visualizations for a competition held by Colegio Jaso, a private school in Pamplona, for a new sports hall."
 },
 "silserkugel-viz": {
  "by": {
   "n": "Fuchs Architekten AG",
   "url": "https://www.fuchs-architekten.ch/projekte/w-eishalle-st-moritz/"
  },
  "year": "2025",
  "ctx": "Competition",
  "svc": "Interior and exterior visualizations and a 360° virtual tour",
  "sub": "Competition entry for an ice rink in St. Moritz",
  "desc": "Interior and exterior visualizations and a 360° virtual tour for Fuchs Architekten's competition entry for an ice rink in St. Moritz."
 },
 "silserkugel-360": {
  "by": {
   "n": "Fuchs Architekten AG",
   "url": "https://www.fuchs-architekten.ch/projekte/w-eishalle-st-moritz/"
  },
  "year": "2025",
  "ctx": "Competition",
  "svc": "Interior and exterior visualizations and a 360° virtual tour",
  "sub": "Competition entry for an ice rink in St. Moritz",
  "desc": "Interior and exterior visualizations and a 360° virtual tour for Fuchs Architekten's competition entry for an ice rink in St. Moritz."
 },
 "arento-viz": {
  "by": {
   "n": "Arento AG",
   "url": "https://arento.ch/projekte/wohnueberbauung-huettenacherplus-baeretswil"
  },
  "year": "2025",
  "ctx": "Marketing and sales",
  "svc": "Interior and exterior visualizations and presentation videos",
  "sub": "Residential development in Bäretswil, visualized for sale",
  "desc": "Interior and exterior visualizations and presentation videos for the marketing of the HüttenacherPLUS residential development in Bäretswil, commissioned by Arento AG."
 },
 "kindergarten-kreuzgut-viz": {
  "by": {
   "n": "Fuchs Architekten AG",
   "url": "https://www.fuchs-architekten.ch/projekte/w-dreifachkindergarten-schaffhausen/"
  },
  "year": "2026",
  "ctx": "Competition",
  "svc": "Exterior visualization",
  "sub": "Competition entry for a kindergarten",
  "desc": "Exterior visualization for Fuchs Architekten's competition entry for the Kreuzgut kindergarten."
 },
 "altstetten-viz": {
  "by": {
   "n": "Fuchs Architekten AG",
   "url": "https://www.fuchs-architekten.ch/projekte/w-wohnsiedlung-altstetten/"
  },
  "year": "2026",
  "ctx": "Competition",
  "svc": "Exterior visualizations",
  "sub": "Competition entry for a housing estate in Zürich-Altstetten",
  "desc": "Exterior renderings for Fuchs Architekten's competition entry for a housing estate in Zürich-Altstetten."
 },
 "oerlikon-print": {
  "by": {
   "n": "Fuchs Architekten AG",
   "url": "https://www.fuchs-architekten.ch/projekte/fassadensanierung-wohnturm-zuerich/"
  },
  "year": "2024",
  "ctx": "Competition",
  "svc": "3D-printed facade model",
  "sub": "Competition entry for a high-rise at Hagenholz, Zürich",
  "desc": "A 3D-printed model of the facade for Fuchs Architekten's competition entry for a high-rise at Hagenholz in Zürich."
 }
};
const PROJECTS = [{
    slug: "graffio-viz",
    title: "Graffio Single-Family House",
    place: "Golino (TI)",
    cat: "Visualization",
    service: "viz",
    pending: false,
    cover: {
      img: P.p2_1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.p2_1,
        t: "Graffio Single-Family House",
        c: "Visualization",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.p2_2,
        t: "Graffio Single-Family House",
        c: "Exterior & interior",
        ar: "ar-43"
      },
        {
        img: P.p2_3,
        t: "Graffio Single-Family House",
        c: "Exterior & interior",
        ar: "ar-43"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.p2_4,
        t: "Graffio Single-Family House",
        c: "Exterior & interior",
        ar: "ar-43"
      },
        {
        img: P.p2_5,
        t: "Graffio Single-Family House",
        c: "Exterior & interior",
        ar: "ar-43"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.p2_6,
        t: "Graffio Single-Family House",
        c: "Exterior & interior",
        ar: "ar-43"
      },
        {
        img: P.p2_7,
        t: "Graffio Single-Family House",
        c: "Exterior & interior",
        ar: "ar-43"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.p2_8,
        t: "Graffio Single-Family House",
        c: "Exterior & interior",
        ar: "ar-43"
      }
      ]
    }
    ]
  }, {
    slug: "viseu-viz",
    title: "Viseu Single-Family House",
    place: "Golino (TI)",
    cat: "Visualization",
    service: "viz",
    pending: false,
    cover: {
      img: P.vs1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.vs1,
        t: "Viseu Single-Family House",
        c: "Visualization",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.vs2,
        t: "Viseu Single-Family House",
        c: "Exterior & garden",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.vs3,
        t: "Viseu Single-Family House",
        c: "Pool & cascade",
        ar: "ar-34"
      },
        {
        img: P.vs4,
        t: "Viseu Single-Family House",
        c: "Pool & cascade",
        ar: "ar-34"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.vs5,
        t: "Viseu Single-Family House",
        c: "Arrival & entrance",
        ar: "ar-169"
      }
      ]
    }
    ]
  }, {
    slug: "casa-lele-viz",
    title: "Casa Lele Single-Family House",
    place: "Cevio (TI)",
    cat: "Visualization",
    service: "viz",
    pending: false,
    cover: {
      img: P.cl1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.cl1,
        t: "Casa Lele Single-Family House",
        c: "Visualization",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.cl2,
        t: "Casa Lele Single-Family House",
        c: "Living & fireplace",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.cl3,
        t: "Casa Lele Single-Family House",
        c: "Village context",
        ar: "ar-169"
      }
      ]
    }
    ]
  }, {
    slug: "football-pitch-viz",
    title: "Jaso Sports Hall",
    place: "Pamplona (ES)",
    cat: "Competition",
    service: "viz",
    pending: false,
    cover: {
      img: P.pult,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.pult,
        t: "Jaso Sports Hall",
        c: "Competition",
        ar: "ar-169"
      }
      ]
    }
    ]
  }, {
    slug: "silserkugel-viz",
    title: "Islas Ice Rink",
    place: "St. Moritz (GR)",
    cat: "Competition",
    service: "viz",
    pending: false,
    cover: {
      img: P.p3_1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.p3_1,
        t: "Islas Ice Rink",
        c: "Competition",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.p3_2,
        t: "Islas Ice Rink",
        c: "Interior atmosphere",
        ar: "ar-43"
      },
        {
        img: P.p3_3,
        t: "Islas Ice Rink",
        c: "Interior atmosphere",
        ar: "ar-43"
      }
      ]
    }
    ]
  }, {
    slug: "arento-viz",
    title: "HüttenacherPLUS Residential Development",
    place: "Bäretswil (ZH)",
    cat: "Real Estate",
    service: "viz",
    pending: false,
    cover: {
      img: P.p5_1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.p5_1,
        t: "HüttenacherPLUS Residential Development",
        c: "Real Estate",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.p5_2,
        t: "HüttenacherPLUS Residential Development",
        c: "Exterior & interior",
        ar: "ar-43"
      },
        {
        img: P.p5_3,
        t: "HüttenacherPLUS Residential Development",
        c: "Exterior & interior",
        ar: "ar-43"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.p5_4,
        t: "HüttenacherPLUS Residential Development",
        c: "Exterior & interior",
        ar: "ar-43"
      }
      ]
    }
    ]
  }, {
    slug: "kindergarten-kreuzgut-viz",
    title: "Kreuzgut Kindergarten",
    place: "Kreuzgut (SH)",
    cat: "Competition",
    service: "viz",
    pending: false,
    cover: {
      img: P.hero,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.hero,
        t: "Kreuzgut Kindergarten",
        c: "Competition",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.p1_2,
        t: "Kreuzgut Kindergarten",
        c: "Exterior perspectives",
        ar: "ar-43"
      },
        {
        img: P.p1_3,
        t: "Kreuzgut Kindergarten",
        c: "Exterior perspectives",
        ar: "ar-43"
      }
      ]
    }
    ]
  }, {
    slug: "altstetten-viz",
    title: "Altstetten Housing Estate",
    place: "Zürich (ZH)",
    cat: "Competition",
    service: "viz",
    pending: false,
    cover: {
      img: P.al1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.al1,
        t: "Altstetten Housing Estate",
        c: "Competition",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.al2,
        t: "Altstetten Housing Estate",
        c: "Street at dusk",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.al3,
        t: "Altstetten Housing Estate",
        c: "Access gallery",
        ar: "ar-32"
      }
      ]
    }
    ]
  }, {
    slug: "casa-lele-print",
    title: "Casa Lele Single-Family House",
    place: "Cevio (TI)",
    cat: "3D Print Model",
    service: "print",
    pending: false,
    cover: {
      img: P.lm1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.lm1,
        t: "Casa Lele Single-Family House",
        c: "3D Print Model",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.lm2,
        t: "Casa Lele Single-Family House",
        c: "Ground floor",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.lm3,
        t: "Casa Lele Single-Family House",
        c: "Plan detail",
        ar: "ar-32"
      },
        {
        img: P.lm4,
        t: "Casa Lele Single-Family House",
        c: "Sectioned elevation",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.lm5,
        t: "Casa Lele Single-Family House",
        c: "Bedroom",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.lm6,
        t: "Casa Lele Single-Family House",
        c: "Printed furniture",
        ar: "ar-32"
      },
        {
        img: P.lm7,
        t: "Casa Lele Single-Family House",
        c: "Kitchen island",
        ar: "ar-32"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: P.lm8,
        t: "Casa Lele Single-Family House",
        c: "Kitchen through the railing",
        ar: "ar-34"
      },
        {
        img: P.lm9,
        t: "Casa Lele Single-Family House",
        c: "Assembly by hand",
        ar: "ar-34"
      }
      ]
    }
    ]
  }, {
    slug: "oerlikon-print",
    title: "Hagenholz High-Rise",
    place: "Zürich (ZH)",
    cat: "3D Print Model",
    service: "print",
    pending: false,
    cover: {
      img: P.oe1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "pair",
      items: [
        {
        img: P.oe1,
        t: "Hagenholz High-Rise",
        c: "3D Print Model",
        ar: "ar-23"
      },
        {
        img: P.oe2,
        t: "Hagenholz High-Rise",
        c: "Grid detail",
        ar: "ar-23"
      }
      ]
    }
    ]
  }, {
    slug: "graffio-print",
    title: "Graffio Single-Family House",
    place: "Golino (TI)",
    cat: "3D Print Model",
    service: "print",
    pending: false,
    cover: {
      img: P.gm1,
      ar: "ar-43"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.gm1,
        t: "Graffio Single-Family House",
        c: "3D Print Model",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: P.gm2,
        t: "Graffio Single-Family House",
        c: "Massing & site",
        ar: "ar-169"
      }
      ]
    }
    ]
  }, {
    slug: "graffio-360",
    title: "Graffio Single-Family House",
    place: "Golino (TI)",
    cat: "360° Virtual Tour",
    service: "tour",
    pending: false,
    cover: {
      img: PNM.amb1,
      ar: "ar-43",
      pano: true
    },
    has360: true,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: PNM.amb1,
        pano: "amb1",
        t: "Bedroom & Bath",
        c: "Enter the 360° tour",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: PNM.amb2,
        pano: "amb2",
        t: "Kitchen",
        c: "Enter the 360° tour",
        ar: "ar-43"
      },
        {
        img: PNM.amb3,
        pano: "amb3",
        t: "Living Room",
        c: "Enter the 360° tour",
        ar: "ar-43"
      }
      ]
    },
      {
      layout: "full",
      items: [
        {
        img: PNM.amb4,
        pano: "amb4",
        t: "Bar & Lounge",
        c: "Enter the 360° tour",
        ar: "ar-43"
      }
      ]
    }
    ]
  }, {
    slug: "silserkugel-360",
    title: "Islas Ice Rink",
    place: "St. Moritz (GR)",
    cat: "360° Virtual Tour",
    service: "tour",
    pending: false,
    cover: {
      img: PNM.court1,
      ar: "ar-43",
      pano: true
    },
    has360: true,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: PNM.court1,
        pano: "court1",
        t: "Ice Rink",
        c: "Enter the 360° tour",
        ar: "ar-169"
      }
      ]
    },
      {
      layout: "pair",
      items: [
        {
        img: PNM.court2,
        pano: "court2",
        t: "Rink — Training",
        c: "Enter the 360° tour",
        ar: "ar-43"
      },
        {
        img: PNM.hall,
        pano: "hall",
        t: "Restaurant",
        c: "Enter the 360° tour",
        ar: "ar-43"
      }
      ]
    }
    ]
  }, {
    slug: "efh-maria-ai",
    title: "Schtubu Multi-Family House – Stairwell",
    place: "Liechtenstein (FL)",
    cat: "AI Visualization",
    service: "ai",
    pending: false,
    cover: {
      img: P.mrs,
      img2: P.mrr,
      ar: "ar-43",
      fit: "50% 50%"
    },
    has360: false,
    rows: [
      {
      layout: "solo",
      items: [
        {
        img: P.mrs,
        img2: P.mrr,
        vars: VARIANTES_MARIA,
        opts: true,
        t: "Stair hall",
        c: "Sketch \u2192 AI visualization",
        ar: "ar-34"
      }
      ]
    }
    ]
  }, {
    slug: "efh-maria-living-ai",
    title: "Schtubu Multi-Family House – Living Room",
    place: "Liechtenstein (FL)",
    cat: "AI Visualization",
    service: "ai",
    pending: false,
    // La portada no lleva la lista de variantes: cargaria las ocho en la home.
    cover: {
      img: P.mls,
      img2: P.ml1,
      ar: "ar-43",
      fit: "42% 50%"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.mls,
        img2: P.ml1,
        vars: VARIANTES_MARIA_LIVING,
        opts: true,
        t: "Living & kitchen",
        c: "Sketch \u2192 AI visualization",
        ar: "ar-pano"
      }
      ]
    }
    ]
  }, {
    slug: "efh-maria-facade-ai",
    title: "Schtubu Multi-Family House – Facade",
    place: "Liechtenstein (FL)",
    cat: "AI Visualization",
    service: "ai",
    pending: false,
    cover: {
      img: P.mfs,
      img2: P.mf1,
      ar: "ar-43",
      fit: "50% 15%"
    },
    has360: false,
    rows: [
      {
      layout: "full",
      items: [
        {
        img: P.mfs,
        img2: P.mf1,
        vars: VARIANTES_MARIA_FACHADA,
        opts: true,
        t: "Garden facade",
        c: "Sketch \u2192 AI visualization",
        ar: "ar-fac"
      }
      ]
    }
    ]
  }];
const PROJECT_BY_SLUG = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));

// Filas de la home a partir de la lista filtrada (ritmo full / pair / pair)
function buildHomeRows(list) {
  const rows = [], PAT = ['full', 'pair', 'pair'];
  let i = 0, k = 0;
  while (i < list.length) {
    const lay = PAT[k++ % PAT.length];
    const items = list.slice(i, i + (lay === 'full' ? 1 : 2));
    rows.push({ layout: items.length === 1 ? 'full' : lay, items });
    i += items.length;
  }
  return rows;
}

// ========== TWEAKS ==========
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "black",
  "headline": "B",
  "serifTitles": true,
  "showStats": false,
  "showTour": true
} /*EDITMODE-END*/;
const ACCENTS = {
  yellow: "#f2c14e",
  coral: "#e86a3a",
  tan: "#b89968",
  black: "var(--ink)"
};
const HEADLINES = {
  A: ["Stop letting your best designs get lost in translation — ", "3DVortex", " turns your concepts into undeniable architectural visualization."],
  B: ["Every pixel, ", "intentional", ". We render the buildings you're about to build."],
  C: ["A Zürich studio for ", "architectural", " clarity — rendered, printed, drafted."]
};

// ========== IDIOMA ==========
// Los datos de arriba (PROJECTS, SERVICES, PANORAMAS, HEADLINES) se evaluan una
// sola vez al cargar, asi que no se traducen ahi: se traducen al pintarlos, con
// t(). LANG es una variable de modulo que App pone al dia en cada render, para
// que t() la vea desde cualquier componente.
const DE = {
  "Sending…": "Wird gesendet …",
  "Thanks — we'll get back to you within one working day.": "Danke — wir melden uns innerhalb eines Arbeitstages.",
  "The form isn't connected yet. Please write to us at ": "Das Formular ist noch nicht angebunden. Bitte schreiben Sie uns an ",
  "It didn't go through. Please write to us at ": "Es hat nicht geklappt. Bitte schreiben Sie uns an ",
  "Home": "Start",
  "Projects": "Projekte",
  "360° Tour": "360°-Tour",
  "Services": "Leistungen",
  "About": "Über uns",
  "Contact": "Kontakt",
  "Menu": "Menü",
  "Follow": "Folgen",
  "Studio · Zürich ↗": "Studio · Zürich ↗",
  "Zürich · Architectural Visualization · EST. 2023": "Zürich · Architekturvisualisierung · seit 2023",
  " — Selected projects": " — Ausgewählte Projekte",
  "Scroll to explore →": "Weiter scrollen →",
  "Stop letting your best designs get lost in translation — ": "Ihre besten Entwürfe verdienen mehr als eine Skizze — ",
  " turns your concepts into undeniable architectural visualization.": " macht aus Ihren Konzepten Architekturvisualisierungen, die überzeugen.",
  "Every pixel, ": "Jedes Pixel ",
  "intentional": "durchdacht",
  ". We render the buildings you're about to build.": ". Wir rendern die Gebäude, die Sie bauen werden.",
  "A Zürich studio for ": "Ein Zürcher Studio für ",
  "architectural": "architektonische",
  " clarity — rendered, printed, drafted.": " Klarheit — gerendert, gedruckt, gezeichnet.",
  "All": "Alle",
  "Visualization": "Visualisierung",
  "3D Print Model": "3D-Druckmodell",
  "360° Virtual Tour": "360° Virtual Tour",
  "AI Visualization": "KI-Visualisierung",
  "Sketch \u2192 Render": "Skizze \u2192 Render",
  "Material variants": "Materialvarianten",
  // fichas: texto y ficha tecnica
  "Private client": "Private Bauherrschaft",
  "Colegio Jaso (private school), Pamplona": "Colegio Jaso (Privatschule), Pamplona",
  "Preliminary design, presentation to the client": "Vorprojekt, Präsentation für die Bauherrschaft",
  "Final visualizations: materials and furnishings": "Schlussvisualisierungen: Materialisierung und Möblierung",
  "Competition": "Wettbewerb",
  "Marketing and sales": "Vermarktung und Verkauf",
  "Exterior visualizations": "Aussenvisualisierungen",
  "Exterior visualization": "Aussenvisualisierung",
  "Interior and exterior visualizations, 360° virtual tour and 3D-printed model": "Innen- und Aussenvisualisierungen, 360° Virtual Tour und 3D-Druckmodell",
  "Interior and exterior visualizations and a 360° virtual tour": "Innen- und Aussenvisualisierungen sowie 360° Virtual Tour",
  "Interior and exterior visualizations and presentation videos": "Innen- und Aussenvisualisierungen sowie Präsentationsvideos",
  "3D-printed facade model": "3D-Druckmodell der Fassade",
  "A single-family house in Golino, Ticino, at preliminary-design stage": "Ein Einfamilienhaus in Golino (TI) in der Vorprojektphase",
  "A single-family house in Golino, Ticino, seen from outside": "Ein Einfamilienhaus in Golino (TI), von aussen gesehen",
  "Materials and furnishings for a single-family house in Cevio, Ticino": "Materialisierung und Möblierung eines Einfamilienhauses in Cevio (TI)",
  "Competition entry for a sports hall for Colegio Jaso in Pamplona": "Wettbewerbsbeitrag für eine Sporthalle des Colegio Jaso in Pamplona",
  "Competition entry for an ice rink in St. Moritz": "Wettbewerbsbeitrag für eine Eishalle in St. Moritz",
  "Residential development in Bäretswil, visualized for sale": "Wohnüberbauung in Bäretswil, visualisiert für den Verkauf",
  "Competition entry for a kindergarten": "Wettbewerbsbeitrag für einen Kindergarten",
  "Competition entry for a housing estate in Zürich-Altstetten": "Wettbewerbsbeitrag für eine Wohnsiedlung in Zürich-Altstetten",
  "Competition entry for a high-rise at Hagenholz, Zürich": "Wettbewerbsbeitrag für ein Hochhaus im Hagenholz, Zürich",
  "Visualizations of the preliminary design for a private client in Golino. They let the client see the house in its setting and discuss the design before it was developed further.": "Visualisierungen des Vorprojekts für eine private Bauherrschaft in Golino. Sie zeigen das Haus in seiner Umgebung und dienten als Grundlage, um den Entwurf vor der Weiterbearbeitung zu besprechen.",
  "Exterior visualizations of the preliminary design, prepared for the presentation to the private client in Golino.": "Aussenvisualisierungen des Vorprojekts, erstellt für die Präsentation bei der privaten Bauherrschaft in Golino.",
  "Final visualizations to decide materials and furnishings with the private client, inside and out, together with a 360° virtual tour and a 3D-printed model of the house.": "Schlussvisualisierungen, mit denen die private Bauherrschaft Materialisierung und Möblierung innen wie aussen festlegen konnte – ergänzt durch eine 360° Virtual Tour und ein 3D-Druckmodell des Hauses.",
  "Visualizations for a competition held by Colegio Jaso, a private school in Pamplona, for a new sports hall.": "Visualisierungen für einen Wettbewerb des Colegio Jaso, einer Privatschule in Pamplona, für eine neue Sporthalle.",
  "Interior and exterior visualizations and a 360° virtual tour for Fuchs Architekten's competition entry for an ice rink in St. Moritz.": "Innen- und Aussenvisualisierungen sowie eine 360° Virtual Tour für den Wettbewerbsbeitrag von Fuchs Architekten für eine Eishalle in St. Moritz.",
  "Interior and exterior visualizations and presentation videos for the marketing of the HüttenacherPLUS residential development in Bäretswil, commissioned by Arento AG.": "Innen- und Aussenvisualisierungen sowie Präsentationsvideos für die Vermarktung der Wohnüberbauung HüttenacherPLUS in Bäretswil, im Auftrag der Arento AG.",
  "Exterior visualization for Fuchs Architekten's competition entry for the Kreuzgut kindergarten.": "Aussenvisualisierung für den Wettbewerbsbeitrag von Fuchs Architekten für den Kindergarten Kreuzgut.",
  "Exterior renderings for Fuchs Architekten's competition entry for a housing estate in Zürich-Altstetten.": "Aussenvisualisierungen für den Wettbewerbsbeitrag von Fuchs Architekten für eine Wohnsiedlung in Zürich-Altstetten.",
  "A 3D-printed model of the facade for Fuchs Architekten's competition entry for a high-rise at Hagenholz in Zürich.": "Ein 3D-Druckmodell der Fassade für den Wettbewerbsbeitrag von Fuchs Architekten für ein Hochhaus im Hagenholz in Zürich.",
  "Commissioned by": "Im Auftrag von",
  "Client": "Bauherrschaft",
  "Location": "Ort",
  "Year": "Jahr",
  "Brief": "Auftrag",
  "Our work": "Leistungen",
  // nombres de proyecto (EN -> DE)
  "Graffio Single-Family House": "EFH Graffio",
  "Viseu Single-Family House": "EFH Viseu",
  "Casa Lele Single-Family House": "EFH Casa Lele",
  "Jaso Sports Hall": "Sporthalle Jaso",
  "Islas Ice Rink": "Eishalle Islas",
  "HüttenacherPLUS Residential Development": "Wohnüberbauung HüttenacherPLUS",
  "Kreuzgut Kindergarten": "Kindergarten Kreuzgut",
  "Altstetten Housing Estate": "Wohnsiedlung Altstetten",
  "Hagenholz High-Rise": "Hochhaus Hagenholz",
  "Schtubu Multi-Family House – Stairwell": "MFH Schtubu Treppenhaus",
  "Schtubu Multi-Family House – Living Room": "MFH Schtubu Wohnzimmer",
  "Schtubu Multi-Family House – Facade": "MFH Schtubu Fassade",
  "Living & kitchen": "Wohnen & K\u00fcche",
  "Garden facade": "Gartenfassade",
  "Timber": "Holz",
  "Stone": "Stein",
  "Timber attic": "Attika in Holz",
  "Stone base & plaster": "Steinsockel & Putz",
  "Terracotta": "Terrakotta",
  "Evening": "Abend",
  "Nordic": "Nordisch",
  "Olive": "Oliv",
  "Coastal": "K\u00fcste",
  "Terracotta wood": "Terrakotta-Holz",
  "Oak & steel": "Eiche & Stahl",
  "Warm oak, evening light": "Warme Eiche, Abendlicht",
  "Terrazzo & plaster": "Terrazzo & Putz",
  "Nordic oak": "Nordische Eiche",
  "Olive & tropical green": "Oliv & Tropengr\u00fcn",
  "Coastal light": "K\u00fcstenlicht",
  "Minimal white": "Minimal Wei\u00df",
  "Oak": "Eiche",
  "Concrete": "Beton",
  "Rattan": "Rattan",
  "Sage": "Salbei",
  "Oak & white": "Eiche & Wei\u00df",
  "Concrete & oak": "Beton & Eiche",
  "Rattan & terrazzo": "Rattan & Terrazzo",
  "Sage & blush": "Salbei & Ros\u00e9",
  "Sketch \u2192 AI visualization": "Skizze \u2192 KI-Visualisierung",
  "Stair hall": "Treppenhalle",
  "Competition": "Wettbewerb",
  "Real Estate": "Immobilien",
  "With ": "Bei ",
  ", every detail matters. Our photoreal visualizations don't just showcase design — they tell a story, creating immersive experiences that resonate with your audience.": " zählt jedes Detail. Unsere fotorealistischen Visualisierungen zeigen nicht nur den Entwurf — sie erzählen eine Geschichte und schaffen Bilder, die bei Ihrem Publikum haften bleiben.",
  "Faster sell‑through": "Schnellerer Verkauf",
  "with photoreal renders": "mit fotorealistischen Renderings",
  "Of buyers rely": "Der Käufer stützen sich",
  "on online listings": "auf Online-Inserate",
  "Higher engagement": "Mehr Aufmerksamkeit",
  "with premium imagery": "mit hochwertigen Bildern",
  "Photoreal Rendering": "Fotorealistisches Rendering",
  "3D Printing": "3D-Druck",
  "Technical Drafting": "Technisches Zeichnen",
  "CAD Restoration": "CAD-Rekonstruktion",
  "Mood Frames": "Stimmungsbilder",
  "Developer Presentations": "Bauträger-Präsentationen",
  "Architectural Dreaming": "Architektonisches Träumen",
  "Four ways we ": "Vier Wege, wie wir Ihr Büro ",
  "render": "rendern",
  " your practice.": ".",
  "Architectural": "Architektur",
  "Renderings": "Renderings",
  "AI": "KI",
  "3D": "3D",
  "Printing": "Druck",
  "Digitalization": "Digitalisierung",
  "& Drafting": "& Zeichnung",
  "From abstract & artistic to highly precise photoreal imagery — each infused with our design signature.": "Von abstrakt und künstlerisch bis hochpräzise und fotorealistisch — jedes Bild mit unserer gestalterischen Handschrift.",
  "Photoreal · Concept · Mood": "Fotorealistisch · Konzept · Stimmung",
  "Sketch‑to‑render in hours. Fine‑tuned materials and illumination ready for pitches, publications and early design rounds.": "Von der Skizze zum Rendering in Stunden. Feinabgestimmte Materialien und Licht für Pitches, Publikationen und frühe Entwurfsphasen.",
  "Concept · Iteration · Pitch": "Konzept · Iteration · Pitch",
  "Tactile, immersive architectural models with accuracy and detail. State‑of‑the‑art printing for architectural studios.": "Greifbare Architekturmodelle mit Präzision und Detailtreue. Modernster Druck für Architekturbüros.",
  "Physical · Scale · Detail": "Physisch · Massstab · Detail",
  "Analog to digital. Hand‑drawn plans become pristine CAD. Precise technical drafting for architecture and engineering.": "Von analog zu digital. Handgezeichnete Pläne werden zu sauberem CAD. Präzises technisches Zeichnen für Architektur und Ingenieurwesen.",
  "CAD · Restoration · Precision": "CAD · Rekonstruktion · Präzision",
  "Interested in starting a project? Feel free to ": "Möchten Sie ein Projekt starten? ",
  "contact us": "Schreiben Sie uns",
  " for more information.": " — wir beraten Sie gern.",
  "All Projects →": "Alle Projekte →",
  "Start a project →": "Projekt starten →",
  "360° Experience": "360°-Erlebnis",
  "Step ": "Treten Sie ",
  "inside": "hinein",
  " the render.": " ins Rendering.",
  "Don't just look at the design — walk through it. Drag to look around, scroll to zoom, and explore each space as if you were standing in it. On your phone, go immersive and look around by simply moving your device.": "Betrachten Sie den Entwurf nicht nur — gehen Sie hindurch. Ziehen zum Umsehen, scrollen zum Zoomen, und jeden Raum erleben, als stünden Sie darin. Auf dem Handy genügt es, das Gerät zu bewegen.",
  "⛶ Immersive view": "⛶ Vollbild",
  "⟳ Drag to look around · Scroll to zoom": "⟳ Ziehen zum Umsehen · Scrollen zum Zoomen",
  "Tap to look around": "Tippen und umsehen",
  "by moving your phone": "durch Bewegen des Handys",
  "◫ VR glasses": "◫ VR-Brille",
  "✕ Exit VR": "✕ VR beenden",
  "Split the view for a Cardboard-style headset": "Ansicht teilen für eine Cardboard-Brille",
  "\\u21bb Turn your phone sideways, then slide it into the glasses": "\\u21bb Handy quer drehen und in die Brille schieben",
  "◎ Motion": "◎ Bewegung",
  "◉ Motion on": "◉ Bewegung an",
  "◎ Tap Motion — move your phone to look around": "◎ Bewegung antippen — Handy bewegen und umsehen",
  "Close ✕": "Schliessen ✕",
  " · 360° Tour": " · 360°-Tour",
  "⟳ Enter 360° Tour": "⟳ 360°-Rundgang starten",
  "Living Room": "Wohnzimmer",
  "Kitchen": "Küche",
  "Bar & Lounge": "Bar & Lounge",
  "Bedroom & Bath": "Schlafen & Bad",
  "Ice Rink": "Eisfeld",
  "Rink — Training": "Eisfeld — Training",
  "Restaurant": "Restaurant",
  "Project · ": "Projekt · ",
  "← Previous project": "← Vorheriges Projekt",
  "Next project →": "Nächstes Projekt →",
  "by 3D Vortex": "von 3D Vortex",
  "360° virtual tour by 3D Vortex": "360°-Rundgang von 3D Vortex",
  "Access gallery": "Erschliessungsgalerie",
  "Arrival & entrance": "Ankunft & Eingang",
  "Assembly by hand": "Montage von Hand",
  "Bedroom": "Schlafzimmer",
  "Enter the 360° tour": "360°-Rundgang starten",
  "Exterior & garden": "Aussenraum & Garten",
  "Exterior & interior": "Aussen & Innen",
  "Exterior perspectives": "Aussenperspektiven",
  "Grid detail": "Rasterdetail",
  "Ground floor": "Erdgeschoss",
  "Images coming soon": "Bilder folgen in Kürze",
  "Interior atmosphere": "Innenraumstimmung",
  "Kitchen island": "Kücheninsel",
  "Kitchen through the railing": "Küche durch das Geländer",
  "Living & fireplace": "Wohnen & Cheminée",
  "Massing & site": "Volumetrie & Umgebung",
  "Plan detail": "Plandetail",
  "Pool & cascade": "Pool & Kaskade",
  "Printed furniture": "Gedruckte Möbel",
  "Sectioned elevation": "Geschnittene Ansicht",
  "Street at dusk": "Strasse in der Dämmerung",
  "Village context": "Dorfkontext",
  "About · 3DVortex": "Über uns · 3DVortex",
  "A studio of architects, engineers & ": "Ein Studio aus Architekten, Ingenieuren & ",
  "image‑makers": "Bildermachern",
  "Located in the dynamic heart of Zürich, our team comprises passionate architects and engineers who are experts in their field — and deeply understand the needs and challenges of architectural studios.": "Mitten im lebendigen Zürich arbeitet unser Team aus Architekten und Ingenieuren, die ihr Fach beherrschen — und die Anforderungen und Zwänge von Architekturbüros aus eigener Erfahrung kennen.",
  "Our journey has been enriched by enthusiasm for emerging technologies and a commitment to precision and innovation. We stand as a partner to architectural practices, offering services designed to enhance project efficiency and creativity, one pixel at a time.": "Uns treibt die Begeisterung für neue Technologien an, zusammen mit dem Anspruch auf Präzision und Innovation. Wir verstehen uns als Partner von Architekturbüros und entwickeln Leistungen, die Projekte effizienter und kreativer machen — Pixel für Pixel.",
  "Founded": "Gegründet",
  "2023 — Zürich, Switzerland": "2023 — Zürich, Schweiz",
  "Practice": "Ausrichtung",
  "Architects · Engineers · Visualization": "Architekten · Ingenieure · Visualisierung",
  "Clients": "Kunden",
  "Architectural studios · Developers · Private commissions": "Architekturbüros · Bauträger · Private Auftraggeber",
  "Languages": "Sprachen",
  "Deutsch · English · Italiano": "Deutsch · English · Italiano",
  "Contact Us · We'd love to hear from you": "Kontakt · Wir freuen uns auf Ihre Nachricht",
  "Let's ": "Lassen Sie uns das Gebäude ",
  " the building you're about to build.": ", das Sie bauen werden.",
  "Studio": "Studio",
  "Reach us": "Erreichbar",
  "Name *": "Name *",
  "Email *": "E-Mail *",
  "Practice / Company": "Büro / Firma",
  "Tell us about the project — scale, timeline, type of deliverable.": "Erzählen Sie uns vom Projekt — Grösse, Zeitplan, gewünschte Leistungen.",
  "Send message →": "Nachricht senden →",
  "Sent ✓ Thank you": "Gesendet ✓ Vielen Dank",
  "3DVortex — Zürich": "3DVortex — Zürich",
  "Architectural visualization, AI rendering, 3D printing and technical drafting for architectural studios.": "Architekturvisualisierung, KI-Rendering, 3D-Druck und technisches Zeichnen für Architekturbüros.",
  "© 3DVortex 2026. All rights reserved.": "© 3DVortex 2026. Alle Rechte vorbehalten.",
  "Legal Details": "Impressum",
  "Privacy Policy": "Datenschutz",
  "Architectural Visualization Studio, Zürich | ": "Studio für Architekturvisualisierung, Zürich | ",
  "Architectural visualization studio in Zürich: photoreal renderings, AI visualization, 3D-printed models, 360° virtual tours and technical drafting.": "Studio für Architekturvisualisierung in Zürich: fotorealistische Renderings, KI-Visualisierung, 3D-Druckmodelle, 360°-Rundgänge und technisches Zeichnen.",
  "360° Virtual Tours — Graffio House & Islas Ice Rink | ": "360°-Rundgänge — EFH Graffio & Eishalle Islas | ",
  "Walk through our architectural visualizations in 360°: the Graffio single-family house in Golino and the Islas ice rink in St. Moritz.": "Gehen Sie durch unsere Architekturvisualisierungen in 360°: das Einfamilienhaus Graffio in Golino und die Eishalle Islas in St. Moritz."
};

let LANG = 'en';

function t(s) {
  if (LANG !== 'de' || s == null) return s;
  return DE[s] !== undefined ? DE[s] : s;
}

// idioma inicial: primero lo que diga la URL, luego lo que se eligio la ultima
// vez, y si no el del navegador
function initialLang() {
  try {
    // La DIRECCION manda siempre: /de/... es aleman y el resto es ingles.
    // El idioma guardado y el del navegador solo deciden en la raiz, que es la
    // unica direccion que no dice de que idioma es. Si no, alguien que eligio
    // aleman una vez veria las paginas inglesas en aleman, y cada pagina
    // contradiria a su propio canonical.
    if (/^\/de(\/|$)/.test(location.pathname)) return 'de';
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'de' || q === 'en') return q;
    if (location.pathname !== '/') return 'en';
    const saved = localStorage.getItem('3dv-lang');
    if (saved === 'de' || saved === 'en') return saved;
    if ((navigator.language || '').toLowerCase().indexOf('de') === 0) return 'de';
  } catch (e) {}
  return 'en';
}




// ========== DIRECCIONES ==========
// La aplicacion entiende dos formas de decir lo mismo:
//   /work/graffio-viz   ← direccion real, la que indexa Google y la que se comparte
//   #/p/graffio-viz     ← la antigua, que se mantiene para no romper enlaces viejos
// `rutaDesdeUrl` traduce la direccion real al formato interno de siempre, asi que
// el resto del codigo no se entera del cambio.

// En /de/... todo cuelga de /de/, para que el aleman tenga direcciones propias.
function prefijoIdioma() {
  return /^\/de(\/|$)/.test(location.pathname) ? '/de' : '';
}
function urlProyecto(slug) {
  return prefijoIdioma() + '/work/' + slug;
}
function urlTour() {
  return prefijoIdioma() + '/tour';
}
function urlInicio() {
  return prefijoIdioma() + '/';
}

function rutaDesdeUrl() {
  const p = decodeURIComponent(location.pathname).replace(/\/+$/, '');
  const m = p.match(/^(?:\/de)?\/work\/([^/]+)$/);
  if (m) return '#/p/' + m[1];
  if (/^(?:\/de)?\/tour$/.test(p)) return '#/360';
  return location.hash;
}

function irA(url) {
  history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}


// La misma pagina en el otro idioma, conservando la ruta y el ancla.
function urlEnIdioma(l) {
  const p = location.pathname.replace(/\/+$/, '').replace(/^\/de(?=\/|$)/, '') || '/';
  const base = l === 'de' ? (p === '/' ? '/de' : '/de' + p) : p;
  return base + location.hash;
}

// ========== ENVIO DEL FORMULARIO ==========
// A donde se manda el formulario de contacto. Mientras esto este vacio, el
// formulario NO finge que envia: avisa de que no esta conectado y ofrece el
// correo. Para activarlo basta pegar aqui la URL del servicio (Formspree,
// Basin, o una funcion propia en Vercel).
const FORM_ENDPOINT = "";

// ========== IMAGENES RESPONSIVE ==========
// Cada foto tiene versiones AVIF y WebP en varios anchos dentro de assets/r/.
// VAR dice, por imagen, su tamaño natural y que anchos existen; el navegador
// elige el que necesita segun el hueco en pantalla y la densidad del aparato.
// El JPEG original sigue ahi como ultimo recurso para quien no soporte ninguno.
const VAR = {"/assets/altstetten-1.jpg":{"h":1333,"s":[500,800,1400,2000],"w":2000},"/assets/altstetten-2.jpg":{"h":1333,"s":[500,800,1400,2000],"w":2000},"/assets/altstetten-3.jpg":{"h":1333,"s":[500,800,1400,2000],"w":2000},"/assets/casa-lele-1.jpg":{"h":1080,"s":[500,800,1400,1625],"w":1625},"/assets/casa-lele-2.jpg":{"h":1080,"s":[500,800,1400,1625],"w":1625},"/assets/casa-lele-3.jpg":{"h":1080,"s":[500,800,1400,1920],"w":1920},"/assets/graffio-model-1.jpg":{"h":596,"s":[500,800,1134],"w":1134},"/assets/graffio-model-2.jpg":{"h":636,"s":[500,800,1134],"w":1134},"/assets/hero.jpg":{"h":1635,"s":[500,800,1400,2000],"w":2200},"/assets/lele-model-1.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-2.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-3.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-4.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-5.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-6.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-7.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-8.jpg":{"h":1080,"s":[500,800,1400,1620],"w":1620},"/assets/lele-model-9.jpg":{"h":1080,"s":[500,608],"w":608},"/assets/maria-liv-sketch.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-terracotta.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-oak.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-evening.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-terrazzo.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-nordic.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-olive.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-coastal.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-liv-minimal.jpg":{"h":630,"s":[800,1400,2000,2842],"w":2842},"/assets/maria-fac-sketch.jpg":{"h":1704,"s":[800,1400,2000,2394],"w":2394},"/assets/maria-fac-timber.jpg":{"h":1704,"s":[800,1400,2000,2394],"w":2394},"/assets/maria-fac-stone.jpg":{"h":1704,"s":[800,1400,2000,2394],"w":2394},"/assets/maria-concrete.jpg":{"h":1336,"s":[500,800,1024],"w":1024},"/assets/maria-rattan.jpg":{"h":1336,"s":[500,800,1024],"w":1024},"/assets/maria-render.jpg":{"h":1336,"s":[500,800,1024],"w":1024},"/assets/maria-sage.jpg":{"h":1336,"s":[500,800,1024],"w":1024},"/assets/maria-sketch.jpg":{"h":1336,"s":[500,800,1024],"w":1024},"/assets/oerlikon-1.jpg":{"h":1422,"s":[500,800],"w":800},"/assets/oerlikon-2.jpg":{"h":1422,"s":[500,800],"w":800},"/assets/p1-2.jpg":{"h":1486,"s":[500,800,1400,2000],"w":2000},"/assets/p1-3.jpg":{"h":1486,"s":[500,800,1400,2000],"w":2000},"/assets/p2-1.jpg":{"h":2000,"s":[500,800,1400,2000],"w":2000},"/assets/p2-2.jpg":{"h":2000,"s":[500,800,1400,2000],"w":2000},"/assets/p2-3.jpg":{"h":2000,"s":[500,800,1400,2000],"w":2000},"/assets/p2-4.jpg":{"h":2000,"s":[500,800,1125],"w":1125},"/assets/p2-5.jpg":{"h":2000,"s":[500,800,1125],"w":1125},"/assets/p2-6.jpg":{"h":1125,"s":[500,800,1400,2000],"w":2000},"/assets/p2-7.jpg":{"h":2000,"s":[500,800,1125],"w":1125},"/assets/p2-8.jpg":{"h":2000,"s":[500,800,1400],"w":1600},"/assets/p3-1.jpg":{"h":2000,"s":[500,800,1400],"w":1600},"/assets/p3-2.jpg":{"h":2000,"s":[500,800,1400],"w":1600},"/assets/p3-3.jpg":{"h":2000,"s":[500,800,1400],"w":1600},"/assets/p5-1.jpg":{"h":1125,"s":[500,800,1400,2000],"w":2000},"/assets/p5-2.jpg":{"h":1125,"s":[500,800,1400,2000],"w":2000},"/assets/p5-3.jpg":{"h":1125,"s":[500,800,1400,2000],"w":2000},"/assets/p5-4.jpg":{"h":1125,"s":[500,800,1400,2000],"w":2000},"/assets/pano-amb-01-m.jpg":{"h":1200,"s":[500,800,1600],"w":1600},"/assets/pano-amb-01-t.jpg":{"h":299,"s":[160,320],"w":320},"/assets/pano-amb-02-m.jpg":{"h":1200,"s":[500,800,1600],"w":1600},"/assets/pano-amb-02-t.jpg":{"h":299,"s":[160,320],"w":320},"/assets/pano-amb-03-m.jpg":{"h":1200,"s":[500,800,1600],"w":1600},"/assets/pano-amb-03-t.jpg":{"h":299,"s":[160,320],"w":320},"/assets/pano-amb-04-m.jpg":{"h":1200,"s":[500,800,1600],"w":1600},"/assets/pano-amb-04-t.jpg":{"h":299,"s":[160,320],"w":320},"/assets/pano-court-01-m.jpg":{"h":1200,"s":[500,800,1600],"w":1600},"/assets/pano-court-01-t.jpg":{"h":299,"s":[160,320],"w":320},"/assets/pano-court-02-m.jpg":{"h":1200,"s":[500,800,1600],"w":1600},"/assets/pano-court-02-t.jpg":{"h":299,"s":[160,320],"w":320},"/assets/pano-hall-m.jpg":{"h":1200,"s":[500,800,1600],"w":1600},"/assets/pano-hall-t.jpg":{"h":299,"s":[160,320],"w":320},"/assets/pult-1.jpg":{"h":2000,"s":[500,800,1400],"w":1600},"/assets/viseu-1.jpg":{"h":1080,"s":[500,800,1400,1919],"w":1919},"/assets/viseu-2.jpg":{"h":1080,"s":[500,800,1400,1919],"w":1919},"/assets/viseu-3.jpg":{"h":1080,"s":[500,800],"w":864},"/assets/viseu-4.jpg":{"h":1080,"s":[500,800],"w":864},"/assets/viseu-5.jpg":{"h":1080,"s":[500,800,1400,1919],"w":1919}};

// Cuanto mide la imagen en pantalla. Medido de verdad sobre el sitio:
// una fila "full" ocupa hasta 1304 px; el resto van a dos columnas, 642 px.
const SIZE_LB = "(max-width: 1383px) 94vw, 1300px";
const SIZE_ESCENA = "(max-width: 760px) 96vw, 800px";
const SIZE_CHIP = "42px";

// Proporcion de cada marco, la que fija la clase ar-* en el CSS.
const AR = { 'ar-fac': 2394 / 1704, 'ar-pano': 2842 / 630, 'ar-32': 1.5, 'ar-43': 4 / 3, 'ar-169': 16 / 9, 'ar-219': 21 / 9,
             'ar-11': 1, 'ar-34': 0.75, 'ar-23': 2 / 3 };

// Con object-fit:cover, si la foto es MAS APAISADA que su marco el navegador la
// escala por la altura y recorta los lados: entonces hace falta mas ancho del que
// mide la caja. Y las fichas que van con zoom fijo necesitan ese zoom de mas.
function factorFoto(data) {
  const v = VAR[data.img];
  if (!v) return 1;
  const foto = v.w / v.h;
  const marco = AR[data.ar] || foto;
  return Math.max(1, foto / marco) * (data.zoom ? 2.6 : 1);
}

function sizesDeFila(layout, f) {
  const x = t => f > 1.02 ? 'calc(' + t + ' * ' + f.toFixed(2) + ')' : t;
  return layout === 'full'
    ? '(max-width: 1420px) ' + x('92vw') + ', ' + x('1304px')
    : '(max-width: 760px) ' + x('92vw') + ', (max-width: 1420px) ' + x('45vw') + ', ' + x('642px');
}

function juego(ruta, ext) {
  const v = VAR[ruta];
  const base = '/assets/r/' + ruta.replace(/^\/assets\//, '').replace(/\.[a-zA-Z]+$/, '');
  return v.s.map(w => base + '-' + w + '.' + ext + ' ' + w + 'w').join(', ');
}

// Envuelve un <img> en un <picture> con sus fuentes AVIF y WebP.
// Si la imagen no esta en VAR (un SVG, por ejemplo), sale un <img> normal.
function Pic(props) {
  const src = props.src;
  const resto = Object.assign({}, props);
  delete resto.sizes;
  resto.decoding = "async";
  const v = VAR[src];
  if (!v) return /*#__PURE__*/React.createElement("img", resto);
  resto.width = v.w;
  resto.height = v.h;
  return /*#__PURE__*/React.createElement("picture", null,
    /*#__PURE__*/React.createElement("source", { type: "image/avif", srcSet: juego(src, 'avif'), sizes: props.sizes }),
    /*#__PURE__*/React.createElement("source", { type: "image/webp", srcSet: juego(src, 'webp'), sizes: props.sizes }),
    /*#__PURE__*/React.createElement("img", resto));
}

// ========== HOOKS ==========
function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: .08
    });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
// La ruta completa, para enterarnos tambien de los cambios de /… a /de/…,
// que no mueven la vista pero si el idioma.
function usePathname() {
  const [p, setP] = useState(() => location.pathname);
  useEffect(() => {
    const f = () => setP(location.pathname);
    window.addEventListener('popstate', f);
    window.addEventListener('hashchange', f);
    return () => {
      window.removeEventListener('popstate', f);
      window.removeEventListener('hashchange', f);
    };
  }, []);
  return p;
}

function useRoute() {
  const [route, setRoute] = useState(rutaDesdeUrl);
  useEffect(() => {
    const f = () => setRoute(rutaDesdeUrl());
    window.addEventListener('hashchange', f);
    window.addEventListener('popstate', f);
    return () => {
      window.removeEventListener('hashchange', f);
      window.removeEventListener('popstate', f);
    };
  }, []);
  return route;
}

// Un solo manejador para TODOS los enlaces internos: navega sin recargar, pero
// respeta cmd+clic, ctrl+clic y el clic central, que es justo lo que se gana al
// usar enlaces de verdad en vez de divs.
function useEnlacesInternos() {
  useEffect(() => {
    const onClick = e => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      let url;
      try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      e.preventDefault();
      if (url.pathname === location.pathname) {
        if (url.hash) {
          location.hash = url.hash;
        } else {
          history.replaceState(history.state, '', url.pathname + url.search);
          window.scrollTo(0, 0);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      } else {
        irA(url.pathname + url.search + url.hash);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
function useCounter(target, active, dur = 1500) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start;
    const tick = t => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return v;
}

// ========== COMPONENTS ==========
function Nav({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  // El prefijo se calcula AQUI, en cada pintado, no al cargar el archivo:
  // en /de/... el menu tiene que apuntar al aleman.
  const pref = prefijoIdioma();
  const links = [[pref + "/", "Home"], [pref + "/#portfolio", "Projects"], [pref + "/#services", "Services"], [pref + "/#about", "About"], [pref + "/#contact", "Contact"]];
  const Lang = ({ cls }) => /*#__PURE__*/React.createElement("span", {
    className: cls
  }, ["en", "de"].map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: l
  }, i ? " · " : null, /*#__PURE__*/React.createElement("a", {
    className: `lang-btn ${lang === l ? 'on' : ''}`,
    href: urlEnIdioma(l),
    hrefLang: l === 'de' ? 'de-CH' : 'en',
    lang: l,
    "aria-label": l === 'de' ? 'Auf Deutsch wechseln' : 'Switch to English'
  }, l.toUpperCase()))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-left"
  }, /*#__PURE__*/React.createElement("a", {
    href: urlInicio()
  }, t("Home")), /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#portfolio"
  }, t("Projects")), /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#services"
  }, t("Services")), /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#about"
  }, t("About")), /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#contact"
  }, t("Contact"))), /*#__PURE__*/React.createElement("a", {
    className: "nav-logo",
    href: urlInicio(),
    "aria-label": "3DVortex"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo-mark",
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: LOGO_SVG
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement(Lang, {
    cls: "lang"
  }), /*#__PURE__*/React.createElement("a", {
    className: "cart"
  }, t("Studio · Zürich ↗"))), /*#__PURE__*/React.createElement("button", {
    className: `burger ${open ? 'on' : ''}`,
    onClick: () => setOpen(o => !o),
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
    className: `mobile-menu ${open ? 'open' : ''}`
  }, links.map(([h, l]) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: h,
    onClick: () => setOpen(false)
  }, t(l))), /*#__PURE__*/React.createElement("div", {
    className: "m-foot"
  }, /*#__PURE__*/React.createElement("span", null, "Aemtlerstrasse 78 · 8003 Zürich"), /*#__PURE__*/React.createElement("span", null, "info@3dvortex.ch · +41 44 203 13 30"), /*#__PURE__*/React.createElement(Lang, {
    cls: "lang m-lang"
  }))));
}
function Statement({
  headlineKey
}) {
  const [a, b, c] = (HEADLINES[headlineKey] || HEADLINES.A).map(t);
  return /*#__PURE__*/React.createElement("section", {
    className: "statement",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kicker reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), t("Zürich · Architectural Visualization · EST. 2023")), /*#__PURE__*/React.createElement("h1", {
    className: "reveal"
  }, a, /*#__PURE__*/React.createElement("strong", null, b), c), /*#__PURE__*/React.createElement("div", {
    className: "under reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, /*#__PURE__*/React.createElement("b", null, "01 / " + String(PROJECTS.length)), t(" — Selected projects")), /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, t("Scroll to explore →")))));
}
// El indice elegido vive FUERA de React: la tarjeta de la ficha y el lightbox
// son dos arboles distintos y tienen que ensenar siempre la misma variante,
// tambien cuando el lightbox se abre encima. Un unico selector basta mientras
// solo haya una escena con variantes; con dos, esto pasa a ser un mapa por slug.
// Un indice POR ESCENA (la clave es la primera imagen de la lista): con dos
// escenas, un indice unico hacia que elegir en una moviera la otra.
const SEL_VAR = { v: {}, subs: new Set() };
function ponVariante(clave, i) {
  SEL_VAR.v[clave] = i;
  SEL_VAR.subs.forEach(f => f(clave, i));
}
function useVariante(clave) {
  const [i, setI] = useState(SEL_VAR.v[clave] || 0);
  useEffect(() => {
    const f = (c, n) => { if (c === clave) setI(n); };
    SEL_VAR.subs.add(f);
    setI(SEL_VAR.v[clave] || 0);
    return () => SEL_VAR.subs.delete(f);
  }, [clave]);
  return i;
}
// Las capas van todas montadas y se cruzan con opacidad: asi el navegador ya
// las tiene descargadas y cambiar de variante es instantaneo, sin parpadeo.
function capasVariante(vars, activa, anchos, estilo) {
  return vars.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: v.k,
    className: `w-lay ${i === activa ? 'on' : ''}`
  }, /*#__PURE__*/React.createElement(Pic, {
    src: v.img,
    sizes: anchos,
    alt: "",
    loading: "lazy",
    style: estilo
  })));
}
function BotonesVariante({ vars, activa, clase }) {
  const clave = vars[0].img;
  return /*#__PURE__*/React.createElement("div", {
    className: clase,
    role: "group",
    "aria-label": t("Material variants")
  }, vars.map((v, i) => /*#__PURE__*/React.createElement("button", {
    key: v.k,
    type: "button",
    className: i === activa ? 'on' : '',
    "aria-pressed": i === activa,
    "aria-label": t(v.d),
    title: t(v.d),
    // La tarjeta entera abre el lightbox y en la portada es un enlace: sin
    // esto, elegir una variante navegaria.
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      ponVariante(clave, i);
    }
  }, t(v.l))));
}
function Tile({
  data,
  onClick,
  idxText,
  always,
  lay,
  href
}) {
  // Con destino es un enlace de verdad (Google lo sigue, se abre en pestaña
  // nueva); sin destino sigue siendo un div, como en el visor de la ficha.
  // Con data.img2 la tarjeta ensena dos imagenes del mismo encuadre: la de
  // abajo (data.img) es la que se ve en reposo y la de arriba (data.img2) se
  // descubre de izquierda a derecha al pasar el raton. Todo el movimiento lo
  // hace el CSS de .shot.wipe; aqui solo se monta la capa y la linea del borde.
  const estiloFoto = {
    objectPosition: data.fit || '50% 50%',
    transform: data.zoom ? 'scale(2.6)' : 'none'
  };
  const anchos = sizesDeFila(lay, factorFoto(data));
  // data.vars: varios acabados del mismo encuadre. data.opts pide los botones,
  // que solo tienen sentido donde la foto se mira de cerca — en la portada la
  // tarjeta es un enlace y la fila entera mide 200 px de alto.
  const vars = data.vars && data.vars.length > 1 ? data.vars : null;
  const vi = useVariante(vars ? vars[0].img : '');
  // Con mas de cuatro variantes la fila de botones no cabe sobre la foto en
  // pantallas medianas: ahi se repite debajo de la imagen (el CSS decide cual
  // de las dos se ve).
  const muchas = !!(vars && data.opts && vars.length > 4);
  const activa = vars ? Math.min(vi, vars.length - 1) : 0;
  const img2 = vars ? vars[activa].img : data.img2;
  const tarjeta = /*#__PURE__*/React.createElement(href ? "a" : "div", {
    className: `shot ${data.ar} ${always ? 'cover' : ''}${img2 ? ' wipe' : ''}`,
    href: href,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Pic, {
    src: data.img,
    sizes: anchos,
    alt: data.alt || data.t,
    loading: "lazy",
    style: estiloFoto
  }), img2 ? /*#__PURE__*/React.createElement("div", {
    className: "w-b",
    "aria-hidden": "true"
  }, vars ? capasVariante(vars, activa, anchos, estiloFoto) : /*#__PURE__*/React.createElement(Pic, {
    src: img2,
    sizes: anchos,
    alt: "",
    loading: "lazy",
    style: estiloFoto
  })) : null, img2 ? /*#__PURE__*/React.createElement("span", {
    className: "w-edge",
    "aria-hidden": "true"
  }) : null, img2 ? /*#__PURE__*/React.createElement("span", {
    className: "w-hint"
  }, t("Sketch \u2192 Render")) : null, vars && data.opts ? /*#__PURE__*/React.createElement(BotonesVariante, {
    vars: vars,
    activa: activa,
    clase: muchas ? "w-opts many" : "w-opts"
  }) : null, data.pano ? /*#__PURE__*/React.createElement("div", {
    className: "deg-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, "⟳"), " ", t("360° Virtual Tour")) : idxText ? /*#__PURE__*/React.createElement("div", {
    className: "idx"
  }, idxText) : null, /*#__PURE__*/React.createElement("div", {
    className: "cap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ttl"
  }, data.t), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, data.c)));
  if (!muchas) return tarjeta;
  return /*#__PURE__*/React.createElement(React.Fragment, null, tarjeta,
    /*#__PURE__*/React.createElement(BotonesVariante, {
      vars: vars,
      activa: activa,
      clase: "w-opts-out"
    }));
}
function HomeGallery() {
  const [filter, setFilter] = useState('all');
  const list = useMemo(() => filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.service === filter), [filter]);
  const rows = useMemo(() => buildHomeRows(list), [list]);
  useReveal(filter);
  const countOf = k => k === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.service === k).length;
  return /*#__PURE__*/React.createElement("section", {
    className: "cluster",
    id: "portfolio"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pfilter reveal",
    role: "group",
    "aria-label": "Filter projects by service"
  }, SERVICES.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.k,
    type: "button",
    className: filter === s.k ? 'on' : '',
    "aria-pressed": filter === s.k,
    onClick: () => setFilter(s.k)
  }, t(s.l), /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, countOf(s.k))))), rows.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: filter + '-' + ri,
    className: `row ${row.layout} reveal`
  }, row.items.map(pr => {
    const meta = t(pr.cat);
    return /*#__PURE__*/React.createElement(Tile, {
      key: pr.slug,
      lay: row.layout,
      always: true,
      data: {
        ...pr.cover,
        ar: row.layout === 'full' ? 'ar-169' : 'ar-43',
        t: t(pr.title),
        c: meta,
        alt: `${t(pr.title)}${pr.place ? ', ' + pr.place : ''} — ${t(pr.cat)} ${t("by 3D Vortex")}`
      },
      href: urlProyecto(pr.slug)
    });
  })))));
}
function ProjectInfo({ proj }) {
  const i = INFO[proj.slug];
  if (!i) return null;
  const e = React.createElement;
  const filas = [
    i.by ? [t("Commissioned by"), i.by.url ? e("a", { href: i.by.url, target: "_blank", rel: "noopener" }, i.by.n, " \u2197") : i.by.n] : null,
    i.client ? [t("Client"), t(i.client)] : null,
    proj.place ? [t("Location"), proj.place] : null,
    i.year ? [t("Year"), i.year] : null,
    i.ctx ? [t("Brief"), t(i.ctx)] : null,
    i.svc ? [t("Our work"), t(i.svc)] : null
  ].filter(Boolean);
  return e("div", { className: "pinfo reveal" },
    e("div", { className: "pi-txt" },
      i.sub ? e("p", { className: "pi-sub" }, t(i.sub)) : null,
      i.desc ? e("p", { className: "pi-desc" }, t(i.desc)) : null),
    filas.length ? e("dl", { className: "pi-dl" }, filas.map(([k, v]) =>
      e(React.Fragment, { key: k }, e("dt", null, k), e("dd", null, v)))) : null);
}
function ProjectPage({
  slug,
  onPano
}) {
  const pi = Math.max(0, PROJECTS.findIndex(p => p.slug === slug));
  const proj = PROJECTS[pi];
  const imgs = useMemo(() => proj.rows.flatMap(r => r.items), [proj]);
  const [lb, setLb] = useState({
    open: false,
    idx: 0
  });
  const prev = PROJECTS[(pi - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(pi + 1) % PROJECTS.length];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "pview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kicker reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), t("Project · "), String(pi + 1).padStart(2, '0'), " / ", String(PROJECTS.length).padStart(2, '0')), /*#__PURE__*/React.createElement("h1", {
    className: "reveal"
  }, t(proj.title), /*#__PURE__*/React.createElement("span", {
    className: "dot-end"
  }, ".")), /*#__PURE__*/React.createElement("div", {
    className: "pmeta reveal"
  }, /*#__PURE__*/React.createElement("span", null, t(proj.cat)), proj.has360 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pill360",
    onClick: () => {
      const first = proj.rows.flatMap(r => r.items).find(x => x.pano);
      if (first) onPano(first.pano);
    }
  }, t("⟳ Enter 360° Tour"))), /*#__PURE__*/React.createElement(ProjectInfo, {
    proj: proj
  }))), /*#__PURE__*/React.createElement("section", {
    className: "cluster"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, proj.rows.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    className: `row ${row.layout} reveal`
  }, row.items.map((it, j) => {
    const idx = imgs.indexOf(it);
    return /*#__PURE__*/React.createElement(Tile, {
      key: j,
      lay: row.layout,
      data: { ...it, t: t(it.t), c: t(it.c), alt: `${t(proj.title)}${proj.place ? ', ' + proj.place : ''} — ${t(it.t || proj.cat)}, ${t(proj.cat)} ${t("by 3D Vortex")}` },
      idxText: `${String(idx + 1).padStart(2, '0')} / ${String(imgs.length).padStart(2, '0')}`,
      onClick: () => it.pano ? onPano(it.pano) : setLb({
        open: true,
        idx
      })
    });
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "pnav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pnav-in"
  }, /*#__PURE__*/React.createElement("a", {
    className: "pn",
    href: urlProyecto(prev.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, t("← Previous project")), /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, t(prev.title))), /*#__PURE__*/React.createElement("a", {
    className: "pn next",
    href: urlProyecto(next.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, t("Next project →")), /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, t(next.title)))))), /*#__PURE__*/React.createElement(Lightbox, {
    images: imgs,
    open: lb.open,
    idx: lb.idx,
    onClose: () => setLb(v => ({
      ...v,
      open: false
    })),
    onNav: d => setLb(v => ({
      ...v,
      idx: (v.idx + d + imgs.length) % imgs.length
    }))
  }));
}

// ========== 360° VIEWER (Pannellum) ==========
// ¿Se puede mover la vista moviendo el telefono? En Android sí de entrada.
// iOS 13+ exige que el usuario lo conceda con un gesto explicito, asi que ahi
// hace falta un toque. MOTION_OK recuerda el permiso durante la visita, para no
// volver a pedirlo en cada visor.
const MOTION_CAPABLE = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches && typeof window.DeviceOrientationEvent !== 'undefined';
const MOTION_NEEDS_TAP = MOTION_CAPABLE && typeof window.DeviceOrientationEvent.requestPermission === 'function';
let MOTION_OK = MOTION_CAPABLE && !MOTION_NEEDS_TAP;
const MOTION_LISTENERS = new Set();

async function askMotion() {
  if (!MOTION_CAPABLE) return false;
  if (!MOTION_NEEDS_TAP) {
    MOTION_OK = true;
  } else {
    try {
      const r = await window.DeviceOrientationEvent.requestPermission();
      MOTION_OK = r === 'granted';
    } catch (e) {
      MOTION_OK = false;
    }
  }
  // avisar a los demas visores abiertos
  MOTION_LISTENERS.forEach(fn => {
    try {
      fn(MOTION_OK);
    } catch (e) {}
  });
  return MOTION_OK;
}

function Pano360({
  src,
  autoRotate = true,
  yaw = 0,
  pitch = 0,
  orientationDefault = false,
  onViewer,
  eye = false,
  motionUI = false
}) {
  const ref = useRef(null);
  const viewerRef = useRef(null);
  // el aviso solo aparece donde hace falta: movil, permiso pendiente
  const [askTap, setAskTap] = useState(motionUI && MOTION_CAPABLE && !MOTION_OK);
  const [motionOn, setMotionOn] = useState(motionUI && MOTION_OK);
  useEffect(() => {
    if (!ref.current || !window.pannellum) return;
    const isTouch = window.matchMedia('(max-width:1080px)').matches;
    viewerRef.current = window.pannellum.viewer(ref.current, {
      type: "equirectangular",
      panorama: src,
      autoLoad: true,
      autoRotate: autoRotate && !isTouch ? -2 : 0,
      autoRotateInactivityDelay: 3000,
      // en modo gafas no hay controles: cada mitad es solo imagen
      showZoomCtrl: !eye,
      showFullscreenCtrl: !eye,
      compass: false,
      yaw,
      pitch,
      // campo de vision fijo por ojo, parecido al de unas gafas de carton
      hfov: eye ? 80 : isTouch ? 85 : 100,
      minHfov: eye ? 80 : 50,
      maxHfov: eye ? 80 : 120,
      orientationOnByDefault: orientationDefault || motionOn,
      backgroundColor: [0.05, 0.04, 0.04]
    });
    onViewer && onViewer(viewerRef.current);
    return () => {
      onViewer && onViewer(null);
      try {
        viewerRef.current && viewerRef.current.destroy();
      } catch (e) {}
    };
  }, [src, autoRotate, yaw, pitch, orientationDefault, eye, motionUI, motionOn]);

  // Encender la orientacion en un visor ya creado. pannellum ignora
  // startOrientation() si no considera "soportada" la orientacion (exige HTTPS y
  // navegador movil), asi que si no prende se recrea el visor con la opcion
  // puesta desde el principio, que es un camino que siempre funciona.
  const enableOrientation = () => {
    const v = viewerRef.current;
    try {
      v && v.startOrientation();
    } catch (e) {}
    setTimeout(() => {
      let on = false;
      try {
        const w = viewerRef.current;
        on = !!(w && w.isOrientationActive());
      } catch (e) {}
      if (!on) setMotionOn(true);
    }, 150);
  };

  // si el permiso se concede en otro visor, este se entera y se enciende
  useEffect(() => {
    if (!motionUI || !MOTION_CAPABLE) return;
    const onGrant = ok => {
      if (!ok) return;
      setAskTap(false);
      enableOrientation();
    };
    MOTION_LISTENERS.add(onGrant);
    return () => MOTION_LISTENERS.delete(onGrant);
  }, [motionUI]);

  const turnOnMotion = async () => {
    const ok = await askMotion();
    setAskTap(false);
    if (!ok) return;
    enableOrientation();
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: `pano ${askTap ? 'needs-motion' : ''}`
  }), askTap && /*#__PURE__*/React.createElement("button", {
    className: "pano-motion",
    onClick: turnOnMotion
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, "◎"), /*#__PURE__*/React.createElement("b", null, t("Tap to look around")), /*#__PURE__*/React.createElement("span", null, t("by moving your phone"))));
}
function Tour360({
  onPano
}) {
  const [i, setI] = useState(0);
  const active = PANORAMAS[i];
  return /*#__PURE__*/React.createElement("section", {
    className: "tour",
    id: "tour"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tour-head reveal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kicker"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), t("360° Experience")), /*#__PURE__*/React.createElement("h2", null, t("Step "), /*#__PURE__*/React.createElement("em", null, t("inside")), t(" the render."))), /*#__PURE__*/React.createElement("p", null, t("Don't just look at the design — walk through it. Drag to look around, scroll to zoom, and explore each space as if you were standing in it. On your phone, go immersive and look around by simply moving your device."))), /*#__PURE__*/React.createElement("div", {
    className: "pano-frame reveal"
  }, /*#__PURE__*/React.createElement(Pano360, {
    key: active.id,
    src: active.src,
    yaw: active.yaw,
    pitch: active.pitch,
    motionUI: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "pano-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "live"
  }), t(active.t), " · ", active.c), /*#__PURE__*/React.createElement("button", {
    className: "pano-fs",
    onClick: () => onPano(active.id)
  }, t("⛶ Immersive view")), /*#__PURE__*/React.createElement("div", {
    className: "pano-hint"
  }, t("⟳ Drag to look around · Scroll to zoom")), /*#__PURE__*/React.createElement(TourBar, {
    current: active,
    onPick: id => setI(PANORAMAS.findIndex(p => p.id === id))
  })), /*#__PURE__*/React.createElement("div", {
    className: "scene-tabs"
  }, PANORAMAS.map((s, idx) => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    className: `scene-tab ${i === idx ? 'on' : ''}`,
    onClick: () => setI(idx)
  }, /*#__PURE__*/React.createElement(Pic, {
    src: s.mid || s.src,
    sizes: SIZE_ESCENA,
    alt: `${t(s.t)}, ${s.c} — ${t("360° virtual tour by 3D Vortex")}`,
    loading: "lazy",
    style: {
      transform: 'scale(2.4)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "deg"
  }, "360°"), /*#__PURE__*/React.createElement("span", {
    className: "lab"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, t(s.t)), /*#__PURE__*/React.createElement("span", {
    className: "c"
  }, s.c)))))));
}
function PanoOverlay({
  panoId,
  onClose
}) {
  const open = !!panoId;
  // el visor recuerda la estancia elegida dentro del tour; al abrirse vuelve a la de origen
  const [cur, setCur] = useState(panoId);
  useEffect(() => {
    setCur(panoId);
  }, [panoId]);
  const pano = cur ? PANO_BY_ID[cur] : panoId ? PANO_BY_ID[panoId] : null;
  const viewerRef = useRef(null);
  const eyeRef = useRef(null);
  const vrPushed = useRef(false);
  const [motion, setMotion] = useState(MOTION_OK);
  const [vr, setVr] = useState(false);

  // El modo gafas mete su propia entrada en el historial. Asi el boton o el
  // gesto de "atras" del movil sale de las gafas en vez de abandonar la pagina.
  useEffect(() => {
    if (!vr) return;
    try {
      history.pushState({ vr: true }, '');
      vrPushed.current = true;
    } catch (e) {}
    const onPop = () => {
      vrPushed.current = false;
      setVr(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [vr]);

  const exitVr = () => {
    if (vrPushed.current) {
      vrPushed.current = false;
      try {
        history.back();
        return;
      } catch (e) {}
    }
    setVr(false);
  };
  const motionCapable = MOTION_CAPABLE;
  const needsPermission = MOTION_NEEDS_TAP;
  // al cambiar de estancia se recrea el visor: si ya hay permiso, sigue encendido
  useEffect(() => {
    setMotion(MOTION_OK);
  }, [cur]);
  useEffect(() => {
    if (!open) setVr(false);
  }, [open]);

  // El ojo derecho copia al izquierdo en cada fotograma. Es lo que mantiene las
  // dos mitades pegadas, tanto si se arrastra con el raton como si manda el
  // giroscopio: solo el ojo izquierdo recibe entrada.
  useEffect(() => {
    if (!vr) return;
    let raf = 0;
    const tick = () => {
      const a = viewerRef.current,
        b = eyeRef.current;
      if (a && b) {
        try {
          b.setYaw(a.getYaw(), false);
          b.setPitch(a.getPitch(), false);
        } catch (e) {}
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [vr, cur]);

  // Al entrar: pantalla completa del navegador y, si se puede, apaisado.
  // Al salir: deshacer las dos cosas.
  useEffect(() => {
    if (vr) {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
      }
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }, [vr]);

  const enterVr = async () => {
    // El clic es el gesto que iOS exige para pedir permiso del giroscopio,
    // asi que se pide aqui, antes de partir la pantalla.
    if (await askMotion()) setMotion(true);
    setVr(true);
  };
  useEffect(() => {
    const k = e => {
      if (!open || e.key !== 'Escape') return;
      // en modo gafas, Escape sale primero de las gafas, no del visor
      if (vr) {
        exitVr();
        return;
      }
      onClose();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose, vr]);
  const toggleMotion = async () => {
    const v = viewerRef.current;
    if (!v) return;
    if (motion) {
      try {
        v.stopOrientation();
      } catch (e) {}
      setMotion(false);
      return;
    }
    const ok = await askMotion();
    if (!ok) return;
    try {
      v.startOrientation();
    } catch (e) {}
    setMotion(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `pano-ov ${open ? 'open' : ''}`
  }, open && vr && /*#__PURE__*/React.createElement("div", {
    className: "vr-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vr-eye"
  }, /*#__PURE__*/React.createElement(Pano360, {
    key: pano.id + '-L',
    src: pano.src,
    yaw: pano.yaw,
    pitch: pano.pitch,
    autoRotate: false,
    eye: true,
    orientationDefault: motion,
    onViewer: v => {
      viewerRef.current = v;
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "vr-exit",
    onClick: exitVr,
    "aria-label": "Exit VR"
  }, t("✕ Exit VR"))), /*#__PURE__*/React.createElement("div", {
    className: "vr-eye"
  }, /*#__PURE__*/React.createElement(Pano360, {
    key: pano.id + '-R',
    src: pano.src,
    yaw: pano.yaw,
    pitch: pano.pitch,
    autoRotate: false,
    eye: true,
    onViewer: v => {
      eyeRef.current = v;
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "vr-exit",
    onClick: exitVr,
    "aria-label": "Exit VR"
  }, t("✕ Exit VR"))), /*#__PURE__*/React.createElement("div", {
    className: "vr-split"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vr-rotate"
  }, /*#__PURE__*/React.createElement("span", null, t("\u21bb Turn your phone sideways, then slide it into the glasses"))), /*#__PURE__*/React.createElement("div", {
    className: "vr-room"
  }, pano.t, " · ", pano.c)), open && !vr && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, /*#__PURE__*/React.createElement(Pano360, {
    key: pano.id,
    src: pano.src,
    yaw: pano.yaw,
    pitch: pano.pitch,
    autoRotate: false,
    orientationDefault: MOTION_OK,
    onViewer: v => {
      viewerRef.current = v;
      if (v && MOTION_OK) setMotion(true);
    }
  }), /*#__PURE__*/React.createElement(TourBar, {
    current: pano,
    onPick: id => setCur(id)
  })), /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, t(pano.t)), /*#__PURE__*/React.createElement("div", {
    className: "c"
  }, t(pano.c), t(" · 360° Tour"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "close vr-btn",
    onClick: enterVr,
    title: t("Split the view for a Cardboard-style headset")
  }, t("◫ VR glasses")), motionCapable && /*#__PURE__*/React.createElement("button", {
    className: `close motion ${motion ? 'on' : ''}`,
    onClick: toggleMotion
  }, motion ? t('◉ Motion on') : t('◎ Motion')), /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: onClose
  }, t("Close ✕")))), motionCapable && !motion && /*#__PURE__*/React.createElement("div", {
    className: "pano-hint",
    key: pano.id + '-mhint'
  }, t("◎ Tap Motion — move your phone to look around"))));
}
function Pull({
  showStats
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setActive(true);
    }, {
      threshold: .2
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const a = useCounter(6, active);
  const b = useCounter(97, active);
  const c = useCounter(60, active);
  return /*#__PURE__*/React.createElement("section", {
    className: "pull reveal",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, t("With "), /*#__PURE__*/React.createElement("strong", null, "3DVortex"), t(", every detail matters. Our photoreal visualizations don't just showcase design — they tell a story, creating immersive experiences that resonate with your audience.")), showStats && /*#__PURE__*/React.createElement("div", {
    className: "stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, /*#__PURE__*/React.createElement("em", null, a, "×")), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t("Faster sell‑through"), /*#__PURE__*/React.createElement("br", null), t("with photoreal renders"))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, /*#__PURE__*/React.createElement("em", null, b, "%")), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t("Of buyers rely"), /*#__PURE__*/React.createElement("br", null), t("on online listings"))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, /*#__PURE__*/React.createElement("em", null, "+", c, "%")), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t("Higher engagement"), /*#__PURE__*/React.createElement("br", null), t("with premium imagery"))))));
}
function Marquee() {
  const items = ["Photoreal Rendering", "AI Visualization", "3D Printing", "Technical Drafting", "CAD Restoration", "Mood Frames", "Developer Presentations", "Architectural Dreaming"];
  const Row = () => /*#__PURE__*/React.createElement("span", null, items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("i", null, t(it)), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }))));
  return /*#__PURE__*/React.createElement("div", {
    className: "marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "track"
  }, /*#__PURE__*/React.createElement(Row, null), /*#__PURE__*/React.createElement(Row, null)));
}
function Services() {
  const list = [{
    n: "01",
    a: "Architectural",
    b: "Renderings",
    d: "From abstract & artistic to highly precise photoreal imagery — each infused with our design signature.",
    tag: "Photoreal · Concept · Mood"
  }, {
    n: "02",
    a: "AI",
    b: "Renderings",
    d: "Sketch‑to‑render in hours. Fine‑tuned materials and illumination ready for pitches, publications and early design rounds.",
    tag: "Concept · Iteration · Pitch"
  }, {
    n: "03",
    a: "3D",
    b: "Printing",
    d: "Tactile, immersive architectural models with accuracy and detail. State‑of‑the‑art printing for architectural studios.",
    tag: "Physical · Scale · Detail"
  }, {
    n: "04",
    a: "Digitalization",
    b: "& Drafting",
    d: "Analog to digital. Hand‑drawn plans become pristine CAD. Precise technical drafting for architecture and engineering.",
    tag: "CAD · Restoration · Precision"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "services",
    id: "services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "reveal"
  }, t("Four ways we "), /*#__PURE__*/React.createElement("em", null, t("render")), t(" your practice.")), list.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "svc-row reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, s.n, " / 04"), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, t(s.a), " ", /*#__PURE__*/React.createElement("em", null, t(s.b))), /*#__PURE__*/React.createElement("div", {
    className: "d"
  }, t(s.d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, t(s.tag))), /*#__PURE__*/React.createElement("div", {
    className: "arr"
  }, "→")))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "cta-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("h3", null, t("Interested in starting a project? Feel free to "), /*#__PURE__*/React.createElement("em", null, t("contact us")), t(" for more information.")), /*#__PURE__*/React.createElement("div", {
    className: "links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: prefijoIdioma() + "/#portfolio"
  }, t("All Projects →")), /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: prefijoIdioma() + "/#contact",
    style: {
      background: 'var(--coral)',
      color: 'var(--bg)',
      borderColor: 'var(--coral)'
    }
  }, t("Start a project →")))));
}
function About() {
  return /*#__PURE__*/React.createElement("section", {
    className: "about-sec",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kicker"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 24,
      height: 1,
      background: 'var(--muted)',
      verticalAlign: 'middle',
      marginRight: 12
    }
  }), t("About · 3DVortex")), /*#__PURE__*/React.createElement("h2", null, t("A studio of architects, engineers & "), /*#__PURE__*/React.createElement("em", null, t("image‑makers")), ".")), /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("p", null, t("Located in the dynamic heart of Zürich, our team comprises passionate architects and engineers who are experts in their field — and deeply understand the needs and challenges of architectural studios.")), /*#__PURE__*/React.createElement("p", null, t("Our journey has been enriched by enthusiasm for emerging technologies and a commitment to precision and innovation. We stand as a partner to architectural practices, offering services designed to enhance project efficiency and creativity, one pixel at a time.")), /*#__PURE__*/React.createElement("div", {
    className: "facts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "r"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, t("Founded")), /*#__PURE__*/React.createElement("div", null, t("2023 — Zürich, Switzerland"))), /*#__PURE__*/React.createElement("div", {
    className: "r"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, t("Practice")), /*#__PURE__*/React.createElement("div", null, t("Architects · Engineers · Visualization"))), /*#__PURE__*/React.createElement("div", {
    className: "r"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, t("Clients")), /*#__PURE__*/React.createElement("div", null, t("Architectural studios · Developers · Private commissions"))), /*#__PURE__*/React.createElement("div", {
    className: "r"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, t("Languages")), /*#__PURE__*/React.createElement("div", null, t("Deutsch · English · Italiano"))))))));
}
function Contact() {
  // listo · enviando · ok · error · sin-conectar
  const [estado, setEstado] = useState('listo');
  const enviar = async e => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target).entries());
    // Trampa antispam: campo escondido que una persona nunca ve ni rellena.
    if (datos.website) return;
    delete datos.website;
    if (!FORM_ENDPOINT) {
      setEstado('sin-conectar');
      return;
    }
    setEstado('enviando');
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      setEstado(r.ok ? 'ok' : 'error');
    } catch (err) {
      setEstado('error');
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "contact",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      marginBottom: 20
    }
  }, t("Contact Us · We'd love to hear from you")), /*#__PURE__*/React.createElement("h2", null, t("Let's "), /*#__PURE__*/React.createElement("em", null, t("render")), t(" the building you're about to build.")), /*#__PURE__*/React.createElement("div", {
    className: "addr"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, t("Studio")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "Aemtlerstrasse 78", /*#__PURE__*/React.createElement("br", null), "8003 Zürich")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, t("Reach us")), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@3dvortex.ch"
  }, "info@3dvortex.ch"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "tel:+41442031330"
  }, "+41 44 203 13 30"))))), /*#__PURE__*/React.createElement("form", {
    className: "reveal",
    onSubmit: enviar,
    noValidate: false
  }, /*#__PURE__*/React.createElement("div", {
    className: "row2"
  }, /*#__PURE__*/React.createElement("input", {
    name: "name",
    required: true,
    autoComplete: "name",
    placeholder: t("Name *")
  }), /*#__PURE__*/React.createElement("input", {
    name: "email",
    required: true,
    type: "email",
    autoComplete: "email",
    placeholder: t("Email *")
  })), /*#__PURE__*/React.createElement("input", {
    name: "company",
    autoComplete: "organization",
    placeholder: t("Practice / Company")
  }), /*#__PURE__*/React.createElement("textarea", {
    name: "message",
    required: true,
    placeholder: t("Tell us about the project — scale, timeline, type of deliverable."),
    rows: 4
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "website",
    tabIndex: -1,
    autoComplete: "off",
    "aria-hidden": "true",
    className: "hp"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: estado === 'enviando' || estado === 'ok'
  }, estado === 'enviando' ? t("Sending…") : estado === 'ok' ? t("Sent ✓ Thank you") : t("Send message →")), estado === 'ok' && /*#__PURE__*/React.createElement("p", {
    className: "form-msg ok",
    role: "status"
  }, t("Thanks — we'll get back to you within one working day.")), (estado === 'error' || estado === 'sin-conectar') && /*#__PURE__*/React.createElement("p", {
    className: "form-msg err",
    role: "alert"
  }, estado === 'sin-conectar' ? t("The form isn't connected yet. Please write to us at ") : t("It didn't go through. Please write to us at "), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@3dvortex.ch"
  }, "info@3dvortex.ch"), "."))))); 
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "3DVortex — Zürich"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-2)',
      fontSize: 14,
      lineHeight: 1.65,
      maxWidth: '40ch',
      margin: 0
    }
  }, t("Architectural visualization, AI rendering, 3D printing and technical drafting for architectural studios."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, t("Menu")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: urlInicio()
  }, t("Home"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#portfolio"
  }, t("Projects"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: urlTour()
  }, t("360° Tour"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#services"
  }, t("Services"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#about"
  }, t("About"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + "/#contact"
  }, t("Contact"))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, t("Contact")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Aemtlerstrasse 78"), /*#__PURE__*/React.createElement("li", null, "8003 Zürich, CH"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@3dvortex.ch"
  }, "info@3dvortex.ch")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "tel:+41442031330"
  }, "+41 44 203 13 30")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, t("Follow")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/3dvortex.ch/",
    target: "_blank",
    rel: "noopener"
  }, "Instagram")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/info-3dvortex-6a718b252/",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.facebook.com/profile.php?id=61554110806838",
    target: "_blank",
    rel: "noopener"
  }, "Facebook"))))), /*#__PURE__*/React.createElement("div", {
    className: "big-mark"
  }, "3D", /*#__PURE__*/React.createElement("em", null, "Vortex"), "."), /*#__PURE__*/React.createElement("div", {
    className: "foot-bot"
  }, /*#__PURE__*/React.createElement("div", null, t("© 3DVortex 2026. All rights reserved.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + (LANG === "de" ? "/impressum" : "/legal")
  }, t("Legal Details")), " · ", /*#__PURE__*/React.createElement("a", {
    href: prefijoIdioma() + (LANG === "de" ? "/datenschutz" : "/privacy")
  }, t("Privacy Policy"))))));
}
// Comparador del lightbox: la posicion del raton (0-100) manda en --wx, y el
// CSS recorta con ella la imagen de arriba. Sin raton se queda a la mitad, que
// es lo que se ve al abrirlo y en pantallas tactiles.
function LbWipe({
  p
}) {
  const ref = useRef(null);
  const [x, setX] = useState(50);
  const vars = p.vars && p.vars.length > 1 ? p.vars : null;
  const vi = useVariante(vars ? vars[0].img : '');
  const activa = vars ? Math.min(vi, vars.length - 1) : 0;
  const seguir = e => {
    const c = ref.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    if (!r.width) return;
    setX(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)));
  };
  // La caja tiene que valer EXACTAMENTE lo que la foto: `max-height` no
  // encoge el ancho de un <img>, asi que sin esto la capa de arriba se estira
  // sobre las franjas vacias del object-fit y las dos imagenes no coinciden.
  const v = typeof VAR !== "undefined" && VAR[p.img];
  const ar = v ? v.w / v.h : 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "lb-wipe",
    ref: ref,
    style: {
      "--wx": x + "%",
      aspectRatio: String(ar),
      width: "min(1300px, 94vw)",
      maxWidth: "calc(86vh * " + ar + ")"
    },
    onClick: e => e.stopPropagation(),
    onPointerMove: seguir,
    onPointerDown: seguir
  }, /*#__PURE__*/React.createElement(Pic, {
    src: p.img,
    sizes: SIZE_LB,
    alt: p.t
  }), /*#__PURE__*/React.createElement("div", {
    className: "lb-b",
    "aria-hidden": "true"
  }, vars ? vars.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: v.k,
    className: `w-lay ${i === activa ? 'on' : ''}`
  }, /*#__PURE__*/React.createElement(Pic, {
    src: v.img,
    sizes: SIZE_LB,
    alt: ""
  }))) : /*#__PURE__*/React.createElement(Pic, {
    src: p.img2,
    sizes: SIZE_LB,
    alt: ""
  })), /*#__PURE__*/React.createElement("span", {
    className: "lb-edge",
    "aria-hidden": "true"
  }), vars ? /*#__PURE__*/React.createElement(BotonesVariante, {
    vars: vars,
    activa: activa,
    clase: vars.length > 4 ? "lb-opts many" : "lb-opts"
  }) : null);
}
function Lightbox({
  images,
  open,
  idx,
  onClose,
  onNav
}) {
  useEffect(() => {
    const k = e => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose, onNav]);
  const p = images[idx] || images[0];
  if (!p) return null;
  // A pantalla completa el barrido deja de ser automatico: la linea sigue al
  // raton, que es como se compara de verdad un boceto con su render.
  const foto = p.img2 ? /*#__PURE__*/React.createElement(LbWipe, {
    p: p
  }) : /*#__PURE__*/React.createElement(Pic, {
    src: p.img,
    sizes: SIZE_LB,
    alt: p.t,
    onClick: e => e.stopPropagation()
  });
  return /*#__PURE__*/React.createElement("div", {
    className: `lb ${open ? 'open' : ''}`,
    onClick: onClose
  }, /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: e => {
      e.stopPropagation();
      onClose();
    }
  }, "Close ✕"), /*#__PURE__*/React.createElement("button", {
    className: "nav-btn prev",
    onClick: e => {
      e.stopPropagation();
      onNav(-1);
    }
  }, "‹"), /*#__PURE__*/React.createElement("button", {
    className: "nav-btn next",
    onClick: e => {
      e.stopPropagation();
      onNav(1);
    }
  }, "›"), foto, /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, p.t), /*#__PURE__*/React.createElement("div", {
    className: "c"
  }, p.c)));
}
function Tweaks({
  values,
  onChange,
  visible
}) {
  const set = (k, v) => onChange({
    ...values,
    [k]: v
  });
  return /*#__PURE__*/React.createElement("div", {
    className: `tweaks ${visible ? 'show' : ''}`
  }, /*#__PURE__*/React.createElement("h5", null, "Tweaks ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--muted)'
    }
  }, "live")), /*#__PURE__*/React.createElement("div", {
    className: "g"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Theme"), /*#__PURE__*/React.createElement("div", {
    className: "pills"
  }, ["light", "tan", "dark"].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: `pill ${values.theme === t ? 'on' : ''}`,
    onClick: () => set('theme', t)
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "g"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Accent color"), /*#__PURE__*/React.createElement("div", {
    className: "sw"
  }, Object.entries(ACCENTS).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: `s ${values.accent === k ? 'on' : ''}`,
    style: {
      background: v
    },
    onClick: () => set('accent', k),
    title: k
  })))), /*#__PURE__*/React.createElement("div", {
    className: "g"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Headline"), /*#__PURE__*/React.createElement("div", {
    className: "pills"
  }, ["A", "B", "C"].map(h => /*#__PURE__*/React.createElement("button", {
    key: h,
    className: `pill ${values.headline === h ? 'on' : ''}`,
    onClick: () => set('headline', h)
  }, "Var ", h)))), /*#__PURE__*/React.createElement("div", {
    className: "g"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Stats block"), /*#__PURE__*/React.createElement("div", {
    className: "pills"
  }, /*#__PURE__*/React.createElement("button", {
    className: `pill ${values.showStats ? 'on' : ''}`,
    onClick: () => set('showStats', !values.showStats)
  }, values.showStats ? 'Visible' : 'Hidden'))));
}

// ========== APP ==========
function App() {
  const [lang, setLang] = useState(initialLang);
  // t() lo lee desde cualquier componente; se pone al dia antes de pintar
  LANG = lang;
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem('3dv-lang', lang);
    } catch (e) {}
    // reflejar el idioma en la URL para que sea enlazable, sin recargar
    try {
      const u = new URL(location.href);
      // Si la direccion ya dice el idioma (/de/...), el ?lang sobra.
      if (lang === 'de' && !/^\/de(\/|$)/.test(location.pathname)) {
        u.searchParams.set('lang', 'de');
      } else {
        u.searchParams.delete('lang');
      }
      history.replaceState(history.state, '', u);
    } catch (e) {}
  }, [lang]);
  const path = usePathname();
  // La direccion manda sobre el idioma, no al reves.
  useEffect(() => {
    const l = /^\/de(\/|$)/.test(path) ? 'de' : 'en';
    setLang(prev => prev === l ? prev : l);
  }, [path]);

  // Primera visita: si el idioma que toca es aleman pero la direccion es la
  // inglesa, se corrige la DIRECCION. Antes se cambiaba solo el texto, y la
  // pagina acababa contradiciendo a su propio canonical.
  useEffect(() => {
    if (lang === 'de' && location.pathname === '/') {
      const u = urlEnIdioma('de');
      history.replaceState(history.state, '', u);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    // solo al montar
    // eslint-disable-next-line
  }, []);

  const [tw, setTw] = useState(TWEAK_DEFAULTS);
  const [tweakVis, setTweakVis] = useState(false);
  const [panoId, setPanoId] = useState(null);
  const route = useRoute();
  useEnlacesInternos();
  let view = 'home',
    slug = null;
  if (route.indexOf('#/360') === 0) view = 'tour';else if (route.indexOf('#/p/') === 0) {
    view = 'project';
    slug = route.slice(4);
  }
  useReveal(route);

  // scroll: section anchors on home, top of page otherwise
  useEffect(() => {
    if (view === 'home' && route && route.indexOf('#/') !== 0) {
      const el = document.getElementById(route.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({
          behavior: 'smooth'
        }), 60);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [route]);

  // Titulo y descripcion propios de cada vista. No sustituye a tener una URL
  // real por proyecto, pero al menos cada vista deja de compartir metadatos.
  useEffect(() => {
    const site = '3DVORTEX';
    let title = t('Architectural Visualization Studio, Zürich | ') + site;
    let desc = t('Architectural visualization studio in Zürich: photoreal renderings, AI visualization, 3D-printed models, 360° virtual tours and technical drafting.');
    if (view === 'tour') {
      title = t('360° Virtual Tours — Graffio House & Islas Ice Rink | ') + site;
      desc = t('Walk through our architectural visualizations in 360°: the Graffio single-family house in Golino and the Islas ice rink in St. Moritz.');
    } else if (view === 'project') {
      const p = PROJECTS.find(x => x.slug === slug);
      if (p) {
        title = `${t(p.title)}${p.place ? ' — ' + p.place : ''} · ${t(p.cat)} | ${site}`;
        const inf = INFO[p.slug];
        desc = inf && inf.desc ? t(p.cat) + ' · ' + t(inf.desc) + (lang === 'de' ? ' 3D Vortex, Studio für Architekturvisualisierung in Zürich.' : ' 3D Vortex, architectural visualization studio in Zürich.') : lang === 'de' ? `${t(p.cat)} von ${t(p.title)}${p.place ? ' in ' + p.place : ''} — 3D Vortex, Studio für Architekturvisualisierung in Zürich.` : `${p.cat} of ${p.title}${p.place ? ' in ' + p.place : ''} by 3D Vortex, architectural visualization studio in Zürich.`;
      }
    }
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement('meta');
      m.setAttribute('name', 'description');
      document.head.appendChild(m);
    }
    m.setAttribute('content', desc);
  }, [view, slug, lang]);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tw.theme);
    document.documentElement.style.setProperty('--coral', ACCENTS[tw.accent] || ACCENTS.coral);
    document.documentElement.style.setProperty('--accent', ACCENTS[tw.accent] || ACCENTS.coral);
  }, [tw.theme, tw.accent]);
  useEffect(() => {
    const onMsg = e => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === '__activate_edit_mode') setTweakVis(true);
      if (e.data.type === '__deactivate_edit_mode') setTweakVis(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  useEffect(() => {
    const k = e => {
      const tag = document.activeElement && document.activeElement.tagName || '';
      if ((e.key === 't' || e.key === 'T') && !/INPUT|TEXTAREA/.test(tag)) setTweakVis(v => !v);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  const updateTw = next => {
    setTw(next);
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: next
    }, '*');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    lang: lang,
    setLang: setLang
  }), view === 'home' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Statement, {
    headlineKey: tw.headline
  }), /*#__PURE__*/React.createElement(HomeGallery, null), /*#__PURE__*/React.createElement(Pull, {
    showStats: tw.showStats
  }), /*#__PURE__*/React.createElement(Marquee, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Contact, null)), view === 'project' && /*#__PURE__*/React.createElement(ProjectPage, {
    key: slug,
    slug: slug,
    onPano: setPanoId
  }), view === 'tour' && /*#__PURE__*/React.createElement(Tour360, {
    onPano: setPanoId
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(PanoOverlay, {
    panoId: panoId,
    onClose: () => setPanoId(null)
  }), /*#__PURE__*/React.createElement(Tweaks, {
    values: tw,
    onChange: updateTw,
    visible: tweakVis
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
