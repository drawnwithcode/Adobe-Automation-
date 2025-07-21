/**
 * Author: Damla Kaya (drawnwithcode)
 * Updates Smart Object layers named "Cad Drawing - <filename>"
 * by replacing their content with updated PDF files.
 * Compatible with Adobe Photoshop CS6.
 */

main();

function main() {
    var psdFolder = Folder.selectDialog("Select folder containing PSD files");
    var pdfFolder = Folder.selectDialog("Select folder containing updated PDF files");

    if (!psdFolder || !pdfFolder) {
        alert("Process cancelled.");
        return;
    }

    var psdFiles = psdFolder.getFiles("*.psd");

    for (var i = 0; i < psdFiles.length; i++) {
        var psdFile = psdFiles[i];
        var fileName = decodeURI(psdFile.name).replace(".psd", "");
        var targetLayerName = "Cad Drawing - " + fileName;

        try {
            var doc = open(psdFile);
            var updated = false;

            for (var j = 0; j < doc.layers.length; j++) {
                var layer = doc.layers[j];

                if (layer.name === targetLayerName && layer.kind === LayerKind.SMARTOBJECT) {
                    doc.activeLayer = layer;

                    var pdfFile = new File(pdfFolder + "/" + fileName + ".pdf");
                    if (pdfFile.exists) {
                        replaceContents(pdfFile);
                        updated = true;
                    } else {
                        alert("Missing PDF for: " + fileName);
                    }
                    break;
                }
            }

            if (updated) {
                doc.save();
            }

            doc.close(SaveOptions.DONOTSAVECHANGES);

        } catch (e) {
            alert("Error updating: " + fileName + "\n" + e.toString());
        }
    }

    alert("Update process completed.");
}

// Replace Smart Object content with given file
function replaceContents(newFile) {
    var desc = new ActionDescriptor();
    desc.putPath(charIDToTypeID("null"), new File(newFile));
    executeAction(stringIDToTypeID("placedLayerReplaceContents"), desc, DialogModes.NO);
}
