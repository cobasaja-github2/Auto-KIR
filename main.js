// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDNFTtDC_vO2lvjVLu8V6nW3_TCI5LWIog",
    authDomain: "autokir-73576.firebaseapp.com",
    databaseURL: "https://autokir-73576-default-rtdb.firebaseio.com",
    projectId: "autokir-73576",
    storageBucket: "autokir-73576.appspot.com",
    messagingSenderId: "961991936019",
    appId: "1:961991936019:web:ae7b9b937944396ccc97e6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

tabelLokasi();

function tabelLokasi() {
    console.log("function tabelLokasi");

    database.ref("Data").child("Lokasi").once("value", function (snapshot) {
        const data = snapshot.val();
        if (snapshot.exists()) {
            console.log("snapshot exists");
            console.log(data);

            var content = "";

            snapshot.forEach(function (snapshot2) {
                var nmLok = snapshot2.key;
                console.log(nmLok);

                content += "<tr>";
                content += "<td><a href=\'#\' onclick=\"editLok(\'" + nmLok + "\')\">" + nmLok + "</a></td>";
                content += "<td><button type=\'button\' onclick=\"hapus(\'" + nmLok + "\')\" class=\'btn btn-danger\'>Delete</button></td>";
                content += "</tr>";
            });

            document.getElementById("rowRuang").innerHTML = content;
            return false;
        };

    });
};

function simpan() {
    console.log("function simpan");

    var inpLokasi = document.getElementById("inpLokasi").value;
    if (inpLokasi == "") {
        console.log("input kosong");
        alert("Input Nama Lokasi Kosong!");
        return false;
    } else {
        console.log("input tdk kosong");
        database.ref("Data/Lokasi").child(inpLokasi).once("value", function (snapshot) {
            const data = snapshot.val();
            console.log(data);
            if (snapshot.exists()) {
                console.log("node ada");
                alert("Lokasi " + inpLokasi + " sdh ada!");
            } else {
                console.log("node tdk ada");
                database.ref("Data/Lokasi/" + inpLokasi).set({
                    Nm_Lok: inpLokasi
                });
                tabelLokasi();
                document.getElementById("inpLokasi").value = "";
                alert("Lokasi " + inpLokasi + " berhasil disimpan");
                return false;
            };
        });
    };
};

function editLok(nmLok) {
    event.preventDefault();
    console.log("function editLok");
    console.log("nmLok: " + nmLok);

    document.getElementById("inpLokasi").value = nmLok;
    document.getElementById("hideLokasi").value = nmLok;
    document.getElementById("btnSimpan").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";
    return false;
};

function update() {
    console.log("function update");

    var txtLok = document.getElementById("inpLokasi").value;
    var hdLok = document.getElementById("hideLokasi").value;
    console.log(txtLok);
    console.log(hdLok);

    if (txtLok == hdLok) {
        console.log("sama");
        document.getElementById("inpLokasi").value = "";
        document.getElementById("hideLokasi").value = "";
        document.getElementById("btnSimpan").style.display = "block";
        document.getElementById("btnUpdate").style.display = "none";
        alert("Tidak ada perubahan nama lokasi!");
        return false;
    } else {
        console.log("tdk sama");

        database.ref("Data/Lokasi/" + txtLok).set({
            Nm_Lok: txtLok
        });
        database.ref("Data/Lokasi/" + hdLok).set(null);

        document.getElementById("inpLokasi").value = "";
        document.getElementById("hideLokasi").value = "";
        document.getElementById("btnSimpan").style.display = "block";
        document.getElementById("btnUpdate").style.display = "none";
        tabelLokasi();
        alert("Nama lokasi berhasil dirubah!");
        return false;
    };

};

function hapus(nmLok) {
    console.log("function delete");
    console.log(nmLok);

    if (confirm("Anda yakin ingin menghapus data lokasi " + nmLok) == true) {
        console.log("yakin");
        database.ref("Data/Lokasi/" + nmLok).set(null);
        alert("Data Lokasi " + nmLok + " berhasil dihapus");
        tabelLokasi();
        return false;
    } else {
        console.log("tdk yakin");
        return false;
    };
};

