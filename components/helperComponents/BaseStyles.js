const View = ({ children, ...rest }) => <div {...rest}>{children}</div>;

const TouchableWithoutFeedback = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

const Text = ({ children, ...rest }) => <p {...rest}>{children}</p>;

export const BaseStyles = {
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: 'transparent',
  },
  baseContentWrapper: {
    paddingTop: 90,
    paddingBottom: 90,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
  vertical_align: {
    display: "flex",
    flexDirection: "column",
  },
  flex_occupy: {
    flex: 1,
  },
  noMargin: {
    margin: 0,
  },
  alignMiddle: {
    alignItems: "center",
  },
  alignCenter: {
    justifyContent: "center",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStartAlign: {
    textAlign: "start",
  },
  textCenterAlign: {
    textAlign: "center",
  },
  textEndAlign: {
    textAlign: "end",
  },
  m_r_sm: {
    marginRight: 4,
  },
  m_l_sm: {
    marginLeft: 4,
  },
  m_t_sm: {
    marginTop: 4,
  },
  m_b_sm: {
    marginBottom: 4,
  },
  m_r: {
    marginRight: 8,
  },
  m_l: {
    marginLeft: 8,
  },
  m_t: {
    marginTop: 8,
  },
  m_b: {
    marginBottom: 8,
  },
  m_r_m: {
    marginRight: 12,
  },
  m_l_m: {
    marginLeft: 12,
  },
  m_t_m: {
    marginTop: 12,
  },
  m_b_m: {
    marginBottom: 12,
  },
  m_r_l: {
    marginRight: 24,
  },
  m_l_l: {
    marginLeft: 24,
  },
  m_t_l: {
    marginTop: 24,
  },
  m_b_l: {
    marginBottom: 24,
  },
  p_r_sm: {
    paddingRight: 4,
  },
  p_l_sm: {
    paddingLeft: 4,
  },
  p_t_sm: {
    paddingTop: 4,
  },
  p_b_sm: {
    paddingBottom: 4,
  },
  p_r: {
    paddingRight: 8,
  },
  p_l: {
    paddingLeft: 8,
  },
  p_t: {
    paddingTop: 8,
  },
  p_b: {
    paddingBottom: 8,
  },
  p_r_m: {
    paddingRight: 12,
  },
  p_l_m: {
    paddingLeft: 12,
  },
  p_t_m: {
    paddingTop: 12,
  },
  p_b_m: {
    paddingBottom: 12,
  },
  p_r_l: {
    paddingRight: 24,
  },
  p_l_l: {
    paddingLeft: 24,
  },
  p_t_l: {
    paddingTop: 24,
  },
  p_b_l: {
    paddingBottom: 24,
  },
  textMedium: {
    fontSize: 15,
  },
  textBig: {
    fontSize: 18,
  },
  textSmall: {
    fontSize: 13,
  },
  textExtraSmall: {
    fontSize: 11,
  },
  textStrong: {
    fontWeight: 600,
  },
  textFaded: {
    opacity: 0.6,
  },
  textPrimary: {
    color: "#fe346e",
  },
  colorBlue: "#2779FF",
  textBlue: {
    color: "#2779FF",
  },
  colorPrimary: "#fe346e",
  colorGray: "#4d4d4d",

  textPurple: {
    color: "#400082",
  },
  textGray: {
    color: "gray",
  },
  tintPurple: {
    tintColor: "#400082",
  },
  textDanger: {
    color: "#E01027",
  },
  colorDanger: "#E01027",
  purple: "#400082",
  textWhite: {
    color: "#fff",
  },
  textLight: {
    color: "#d1d1d1",
  },
  horizontalScroll: {
    display: "flex",
    overflowX: "scroll",
  },
  bgPrimary: {
    background: "#fe346e",
  },
  bgWhite: {
    background: "#fff",
  },

  bgPurple: {
    background: "#400082",
  },
  bgGray: {
    background: "#4d4d4d",
  },
  borderRadius_m: {
    borderRadius: 8,
  },
  borderTRRadius_m: {
    borderTopRightRadius: 18,
  },
  borderTLRadius_m: {
    borderTopLeftRadius: 18,
  },
  borderBRRadius_m: {
    borderBottomRightRadius: 18,
  },
  borderBLRadius_m: {
    borderBottomLeftRadius: 18,
  },
  absoluteRight: {
    position: "absolute",
    right: 0,
  },
  absoluteLeft: {
    position: "absolute",
    left: 0,
  },
};
