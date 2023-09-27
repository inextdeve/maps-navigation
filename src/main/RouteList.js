const RouteList = () => {
    return <Box>
        <Autocomplete
          size="small"
          open={openSearch}
          onInputChange={(_, value) => {
            if (value.length === 0) {
              setOpenSearch(false);
            } else {
              setOpenSearch(true);
            }
            setSearchValue(value);
            search(value);
          }}
          onClose={() => setOpenSearch(false)}
          disablePortal
          id="combo-box-demo"
          options={filter().map((item) => ({ label: item[searchLabel] }))}
          sx={{ width: 200, maxHeight: "20px" }}
          renderInput={(params) => (
            <TextField size="small" {...params} label={labelName} />
          )}
          onChange={(_, value) => {
            setSearchValue(value);
            search(value);
          }}
          multiple={false}
        />
    </Box>
}