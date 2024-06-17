const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9*60*60*1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if(hour > 0) return `${hour} 시간전`;
    else if (minute > 0) return `${minute}분 전`;
    else if (second > 0) return `${second}초 전`;
    else "방금 전";

};

const renderData = (data) => {
    const main = document.querySelector("main");
    data.reverse().forEach(async (e) => {
        const div = document.createElement("div");
        div.className = "item-list";

        const imgDiv = document.createElement("div");
        imgDiv.className = "item-list__img";

        const img = document.createElement("img");
        const res = await fetch(`/images/${e.id}`)
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        img.src = url;

        const InforDiv = document.createElement("div");
        InforDiv.className = "item-list__info";

        const InforTitleDiv = document.createElement("div");
        InforTitleDiv.className = "item-list__info-title";
        InforTitleDiv.innerText = e.title;

        const InforMetaDiv = document.createElement("div");
        InforMetaDiv.className = "item-list__info-meta";
        InforMetaDiv.innerText = e.place + " " + calcTime(e.insertAt);

        const InforPriceDiv = document.createElement("div");
        InforPriceDiv.className = "item-list__info-price";
        InforPriceDiv.innerText = e.price;

        imgDiv.appendChild(img);
        InforDiv.appendChild(InforTitleDiv);
        InforDiv.appendChild(InforMetaDiv);
        InforDiv.appendChild(InforPriceDiv);
        div.appendChild(imgDiv);
        div.appendChild(InforDiv);
        main.appendChild(div);
    });
};

const fetchList = async() => {
    const res = await fetch("/items");
    const data = await res.json();
    renderData(data);
};

fetchList();