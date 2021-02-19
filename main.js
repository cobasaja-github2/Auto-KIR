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
var ref = database.ref("Data").child("Lokasi");
tabelLokasi();

function tabelLokasi() {
    console.log("function tabelLokasi");
    ref.once("value", function (snapshot) {
        if (snapshot.exists()) {
            console.log("snapshot exists");
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
        } else {
            document.getElementById("rowRuang").innerHTML = "";
        };
    });
    return false;
};

function simpan() {
    console.log("function simpan");
    var inpLokasi = document.getElementById("inpLokasi").value;
    if (inpLokasi == "") {
        console.log("input kosong");
        document.getElementById("Notif-Body").innerHTML = "Input Nama Lokasi Kosong!";
        $("#Notif").modal("show");
        return false;
    } else {
        console.log("input tdk kosong");
        ref.child(inpLokasi).once("value", function (snapshot) {
            if (snapshot.exists()) {
                console.log("node ada");
                document.getElementById("inpLokasi").value = "";
                document.getElementById("Notif-Body").innerHTML = "Lokasi " + inpLokasi + " sdh ada!";
                $("#Notif").modal("show");
                return false;
            } else {
                console.log("node tdk ada");
                ref.child(inpLokasi).set({
                    Nm_Lok: inpLokasi
                });
                tabelLokasi();
                document.getElementById("inpLokasi").value = "";
                document.getElementById("Notif-Body").innerHTML = "Lokasi " + inpLokasi + " berhasil disimpan";
                $("#Notif").modal("show");
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
        clearInp();
        document.getElementById("Notif-Body").innerHTML = "Tidak ada perubahan nama lokasi!";
        $("#Notif").modal("show");
        return false;
    } else {
        console.log("tdk sama");
        ref.child(txtLok).once("value", function (snapshot) {
            if (snapshot.exists()) {
                console.log("update node akan menimpa data lain yang sama");
                document.getElementById("Notif-Body").innerHTML = "Nama Lokasi " + txtLok + " sdh ada di database. Coba nama lokasi lain.";
                $("#Notif").modal("show");
                return false;
            } else {
                console.log("update node tdk akan menimpa data lain");
                ref.child(txtLok).set({
                    Nm_Lok: txtLok
                });
                ref.child(hdLok).set(null);
                clearInp();
                tabelLokasi();
                document.getElementById("Notif-Body").innerHTML = "Nama lokasi berhasil dirubah!";
                $("#Notif").modal("show");
                return false;
            };
        });
    };
};

function hapus(nmLok) {
    console.log("function delete");
    console.log(nmLok);
    document.getElementById("Confirm-Body").innerHTML = "<p>Anda yakin ingin menghapus data Lokasi " + nmLok + "?</P><input type=\'hidden\' id=\'idDel\'>";
    document.getElementById("idDel").value = nmLok;
    $("#Confirm").modal("show");
    return false;
};

function doHapus() {
    console.log("function doHapus");
    var nmLok = document.getElementById("idDel").value;
    $("#Confirm").modal("hide");
    ref.child(nmLok).set(null);
    document.getElementById("Notif-Body").innerHTML = "Data Lokasi " + nmLok + " berhasil dihapus";
    $("#Notif").modal("show");
    tabelLokasi();
    return false;
};

function clearInp() {
    console.log("function clearInp");
    document.getElementById("inpLokasi").value = "";
    document.getElementById("hideLokasi").value = "";
    document.getElementById("btnSimpan").style.display = "block";
    document.getElementById("btnUpdate").style.display = "none";
};
