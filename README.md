# Introduction

This GitHub action wraps the [cdxgen](https://github.com/AppThreat/cdxgen) tool for generating Software Bill-of-Materials (BOM) for supported projects. Optionally, the generated file can be exported to dependency track or AppThreat server for further oss analysis.

## Usage

Simple usage, just print the xml to the console

```yaml
uses: AppThreat/cdxgen-action@v1
```

Specifiy parameters for automatic submission to a dependency track or AppThreat server

```yaml
- uses: AppThreat/cdxgen-action@v1
  with:
    output: "./reports/bom.xml"
    serverUrl: "https://deptrack.appthreat.io"
    apiKey: ${{ secrets.apiKey }}
```

Submit to server as well as store artefacts

```yaml
- uses: AppThreat/cdxgen-action@v1
  with:
    output: "./reports/bom.xml"
    serverUrl: "https://deptrack.appthreat.io"
    apiKey: ${{ secrets.apiKey }}

- uses: actions/upload-artifact@v1
  with:
    name: reports
    path: reports
```
