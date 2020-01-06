# Introduction

This GitHub action wraps the [cdxgen]() tool for generating Software Bill-of-Materials (BOM) for supported projects. Optionally, the generated file can be exported to dependency track or AppThreat server for further oss analysis.

## Usage

Simple usage, just print the xml to the console

```yaml
uses: actions/cdxgen-action@v1
```

Specifiy parameters for automatic submission to a dependency track or AppThreat server

```yaml
uses: actions/cdxgen-action@v1
with:
  output: "./docs/bom.xml"
  serverUrl: "https://deptrack.appthreat.io"
  apiKey: ${{ secrets.apiKey }}
```
