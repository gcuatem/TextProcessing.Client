import { useRef, useState } from "react";

const ProcessingForm = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [processing, setProcessing] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const handleProcess = async () => {
    setOutput("");
    setProcessing(true);
    controllerRef.current = new AbortController();

    const response = await fetch("http://localhost:5234/api/Processing", {
      method: "POST",
      body: JSON.stringify({ input }),
      headers: { "Content-Type": "application/json" },
      signal: controllerRef.current.signal,
    });

    if (!response.body) {
      setOutput("No response body");
      setProcessing(false);
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setOutput((prev) => prev + decoder.decode(value));
    }

    setProcessing(false);
  };
  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setProcessing(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="h5 mb-0">Text Processor</h2>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="inputText" className="form-label fw-bold">
                  Input Text
                </label>
                <textarea
                  id="inputText"
                  className="form-control"
                  rows={3}
                  value={input}
                  onChange={(e) =>
                    setInput((e.target as HTMLTextAreaElement)?.value || "")
                  }
                  disabled={processing}
                  placeholder="Enter text to process..."
                />
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                <button
                  className="btn btn-primary me-md-2"
                  onClick={handleProcess}
                  disabled={processing || !input.trim()}
                >
                  {processing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Process"
                  )}
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleCancel}
                  disabled={!processing}
                >
                  Cancel
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="outputText" className="form-label fw-bold">
                  Processed Output
                </label>
                <textarea
                  id="outputText"
                  className="form-control font-monospace"
                  rows={5}
                  value={output}
                  readOnly
                  placeholder="Results will appear here..."
                />
              </div>
            </div>
            <div className="card-footer text-muted small">
              Processing may take some time. Each character appears with a 1-5
              second delay.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingForm;
