export const checkBoxStyles = {
  components: {
    Checkbox: {
      variants: {
        outlineNew: {
          control: {
            borderRadius: "4px",
            borderColor: "gray.400",
            borderWidth: 1,
          },
        },
      },
      defaultProps: {
        variant: "outlineNew",
        colorScheme: "indigo",
      },
    },
  },
};
