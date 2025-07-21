/**
 * Author: Damla Kaya (drawnwithcode)
 * Converts PDF files to PSD using MediaBox and Smart Object conversion via Action.
 * Compatible with Adobe Photoshop CS6.
 */

main();

function main() {
    var inputFolder = Folder.selectDialog("Select the folder containing PDF files");
    var outputFolder = Folder.selectDialog("Select the folder to save PSD files");

    if (!inputFolder || !outputFolder) {
        alert("Process cancelled.");
        return;
    }

    var pdfFiles = inputFolder.getFiles("*.pdf");
    if (pdfFiles.length === 0) {
        alert("No PDF files found in selected folder.");
        return;
    }

    var openOptions = new PDFOpenOptions();
    openOptions.antiAlias = true;
    openOptions.mode = OpenDocumentMode.RGB;
    openOptions.bitsPerChannel = BitsPerChannelType.EIGHT;
    openOptions.resolution = 300;
    openOptions.cropPage = CropToType.MEDIABOX;
    openOptions.page = 1;

    for (var i = 0; i < pdfFiles.length; i++) {
        var file = pdfFiles[i];
        var fileName = decodeURI(file.name).replace(".pdf", "");

        try {
            var doc = open(file, openOptions);

            // Use action to convert layer to Smart Object
            selectLayer(doc.layers[0].name);
            executeSmartObjectAction();
             
            // ✅ Rename the active layer
            doc.activeLayer.name = "Cad Drawing - " + fileName;

            // Save PSD
            var saveFile = new File(outputFolder + "/" + fileName + ".psd");
            var psdOptions = new PhotoshopSaveOptions();
            doc.saveAs(saveFile, psdOptions, true);

        } catch (e) {
            alert("Error processing file: " + file.name + "\n" + e);
        } finally {
            if (doc) {
                doc.close(SaveOptions.DONOTSAVECHANGES);
            }
        }
    }

    alert("All PDFs have been converted to PSD.");
}

// Helper to select a specific layer
function selectLayer(layerName) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putName(charIDToTypeID("Lyr "), layerName);
    desc.putReference(charIDToTypeID("null"), ref);
    desc.putBoolean(charIDToTypeID("MkVs"), false);
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
}

// Helper to run the Convert to Smart Object action
function executeSmartObjectAction() {
    var idnewPlacedLayer = stringIDToTypeID("newPlacedLayer");
    executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
}
