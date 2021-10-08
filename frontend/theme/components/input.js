export const inputStyles = {
  components: {
    Input: {
      variants: {
        outlineNew: {
          field: {
            borderRadius: "4px",
            borderColor: "gray.400",
            borderWidth: 1,
          },
        },
      },
      defaultProps: {
        variant: "outlineNew",
      },
    },
  },
};
