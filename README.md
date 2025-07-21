# Adobe Automation

Scripts to automate architectural CAD workflows in Adobe Photoshop using ExtendScript (JSX).

## 📂 Contents

- `batchPDFtoPSD.jsx`  
  Converts a batch of CAD PDFs into Photoshop PSDs. Each PDF will be placed as a Smart Object layer named **"Cad Drawing - [FileName]"**.

- `UpdateSmartObjects.jsx`  
  Automatically replaces the **Smart Object** layers named **"Cad Drawing - [FileName]"** in existing PSDs with updated PDFs — preserving position and scale.

## ✅ Requirements

- Adobe Photoshop CS6 or later 
- ExtendScript 
- Make sure the PDF filenames remain the same for the update script to work correctly.
- 
## 🔧 Usage

1. Run `CreatePSDFromPDF.jsx` to generate PSD files from your PDFs.
2. Modify PSDs as needed (add layers, annotations, etc.).
3. When PDF drawings are updated, run `UpdateSmartObjects.jsx` to refresh them in-place.

