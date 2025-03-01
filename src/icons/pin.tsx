import { IconProps } from "./type";

export const ICPin: React.FC<IconProps> = ({
  fill = "var(--icon-high-em)",
  width = 18,
  height = 18,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <g clipPath="url(#clip0_15347_5245)">
        <path
          d="M0.74984 18.0001C0.948736 18 1.13947 17.921 1.28009 17.7803L6.24434 12.8161L7.18034 13.7851C7.88581 14.5306 8.85813 14.9659 9.88409 14.9956C10.2261 14.9966 10.5658 14.939 10.8883 14.8253C11.3867 14.6537 11.8246 14.3411 12.1488 13.9255C12.473 13.5098 12.6695 13.009 12.7146 12.4838C12.796 11.7232 12.7396 10.9541 12.5481 10.2136L12.3876 9.43205C12.3572 9.30708 12.3594 9.17639 12.3941 9.05253C12.4288 8.92868 12.4947 8.81582 12.5856 8.7248L13.7758 7.5338C13.8228 7.48667 13.8863 7.45975 13.9528 7.4588C13.9762 7.45446 14.0003 7.45672 14.0224 7.46533C14.0445 7.47395 14.0638 7.48857 14.0781 7.50755C14.4548 7.90704 14.9616 8.15912 15.5075 8.21851C16.0534 8.27789 16.6025 8.14069 17.0563 7.83155C17.3226 7.64172 17.5443 7.39612 17.706 7.11186C17.8677 6.8276 17.9655 6.51151 17.9925 6.1856C18.0196 5.8597 17.9753 5.53181 17.8627 5.22478C17.7501 4.91775 17.5719 4.63895 17.3406 4.4078L13.6498 0.715552C13.2709 0.327128 12.7674 0.0842654 12.2275 0.0294264C11.6877 -0.0254126 11.1457 0.111261 10.6963 0.415552C10.43 0.605327 10.2082 0.85088 10.0465 1.13511C9.88472 1.41934 9.78688 1.73542 9.75975 2.06133C9.73262 2.38723 9.77686 2.71514 9.88939 3.0222C10.0019 3.32926 10.18 3.6081 10.4113 3.8393L10.4683 3.8963C10.5113 3.93957 10.5354 3.99808 10.5354 4.05905C10.5354 4.12003 10.5113 4.17853 10.4683 4.2218L9.26834 5.4218C9.17628 5.51366 9.06192 5.58001 8.93648 5.61433C8.81105 5.64865 8.67884 5.64976 8.55284 5.61755L7.94009 5.4608C7.18638 5.26396 6.40333 5.20476 5.62859 5.28605C5.07911 5.34296 4.55735 5.55578 4.12482 5.89941C3.69229 6.24304 3.36702 6.70317 3.18734 7.22555C2.99126 7.76237 2.9526 8.34402 3.0759 8.90207C3.1992 9.46011 3.47934 9.97132 3.88334 10.3756L5.20184 11.7406L0.21959 16.7198C0.114733 16.8247 0.0433283 16.9583 0.0144026 17.1038C-0.014523 17.2492 0.00032918 17.4 0.0570817 17.537C0.113834 17.6741 0.209939 17.7912 0.333246 17.8736C0.456554 17.956 0.601527 18 0.74984 18.0001ZM4.60109 7.72505C4.6856 7.46954 4.84238 7.24401 5.05242 7.07575C5.26247 6.9075 5.51679 6.80375 5.78459 6.77705C5.95726 6.75908 6.13074 6.75007 6.30434 6.75005C6.72983 6.75007 7.15355 6.80477 7.56509 6.9128L8.18234 7.0703C8.5605 7.16598 8.95701 7.16203 9.33319 7.05885C9.70938 6.95567 10.0524 6.75677 10.3288 6.48155L11.5288 5.28155C11.8526 4.95679 12.0345 4.5169 12.0345 4.0583C12.0345 3.5997 11.8526 3.15981 11.5288 2.83505L11.4718 2.77805C11.3942 2.70058 11.3345 2.60701 11.2969 2.50396C11.2593 2.4009 11.2448 2.29085 11.2544 2.18158C11.264 2.0723 11.2974 1.96646 11.3524 1.87152C11.4073 1.77657 11.4824 1.69483 11.5723 1.63205C11.7324 1.53517 11.9209 1.49644 12.1062 1.5224C12.2915 1.54836 12.4621 1.63742 12.5893 1.77455L16.2823 5.46755C16.36 5.54503 16.4197 5.63859 16.4573 5.74165C16.4948 5.84471 16.5093 5.95475 16.4998 6.06403C16.4902 6.1733 16.4567 6.27914 16.4018 6.37409C16.3469 6.46904 16.2718 6.55078 16.1818 6.61355C16.0201 6.71176 15.8291 6.7505 15.6419 6.72313C15.4546 6.69575 15.2827 6.60396 15.1558 6.46355C15.0015 6.30444 14.8169 6.17787 14.6129 6.0913C14.4088 6.00474 14.1895 5.95994 13.9678 5.95955C13.5003 5.96168 13.0519 6.14566 12.7176 6.47255L11.5281 7.6628C11.258 7.93309 11.0612 8.26771 10.9562 8.63512C10.8512 9.00253 10.8416 9.39062 10.9281 9.7628L11.0923 10.5563C11.2437 11.1349 11.2897 11.7359 11.2281 12.3308C11.2102 12.5734 11.1213 12.8054 10.9727 12.9979C10.824 13.1905 10.622 13.3351 10.3918 13.4138C10.0082 13.5147 9.60379 13.5048 9.2255 13.3853C8.84721 13.2659 8.51049 13.0417 8.25434 12.7388L4.95434 9.3263C4.74857 9.12108 4.60593 8.86118 4.54332 8.57739C4.48071 8.29359 4.50076 7.9978 4.60109 7.72505Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_15347_5245">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ICUnPin: React.FC<IconProps> = ({
  fill = "var(--icon-high-em)",
  width = 18,
  height = 18,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <g clipPath="url(#clip0_15384_4398)">
        <path
          d="M4.76406 5.49673C4.5364 5.59651 4.3214 5.72566 4.12482 5.88183C3.69229 6.22546 3.36702 6.68559 3.18734 7.20797C2.99126 7.74479 2.9526 8.32644 3.0759 8.88449C3.1992 9.44253 3.47934 9.95375 3.88334 10.358L5.20184 11.723L0.21959 16.7022C0.114733 16.8071 0.0433283 16.9407 0.0144026 17.0862C-0.014523 17.2317 0.00032918 17.3824 0.0570817 17.5195C0.113834 17.6565 0.209939 17.7736 0.333246 17.856C0.456554 17.9384 0.601528 17.9824 0.74984 17.9825C0.948736 17.9824 1.13947 17.9034 1.28009 17.7627L6.24434 12.7985L7.18034 13.7675C7.88581 14.513 8.85813 14.9483 9.88409 14.978C10.2261 14.979 10.5658 14.9214 10.8883 14.8077C11.3867 14.6361 11.8246 14.3235 12.1488 13.9079C12.3044 13.7084 12.4306 13.4893 12.5247 13.2574L11.2512 11.9839C11.2471 12.0937 11.2394 12.2036 11.2281 12.3132C11.2102 12.5558 11.1213 12.7878 10.9727 12.9804C10.824 13.1729 10.622 13.3175 10.3918 13.3962C10.0082 13.4971 9.60379 13.4872 9.2255 13.3678C8.84721 13.2483 8.51049 13.0241 8.25434 12.7212L4.95434 9.30872C4.74857 9.1035 4.60593 8.8436 4.54332 8.55981C4.48071 8.27602 4.50076 7.98022 4.60109 7.70747C4.68561 7.45196 4.84238 7.22643 5.05242 7.05818C5.26247 6.88993 5.51679 6.78617 5.78459 6.75947C5.85911 6.75172 5.93378 6.74563 6.00855 6.74121L4.76406 5.49673Z"
          fill={fill}
        />
        <path
          d="M11.521 8.01522C11.4282 7.90642 11.427 7.74637 11.5281 7.64522L12.7176 6.45497C13.0519 6.12808 13.5003 5.9441 13.9678 5.94197C14.1895 5.94236 14.4088 5.98716 14.6129 6.07373C14.8169 6.16029 15.0015 6.28686 15.1558 6.44597C15.2827 6.58638 15.4546 6.67817 15.6419 6.70555C15.8291 6.73293 16.0201 6.69418 16.1818 6.59597C16.2718 6.5332 16.3469 6.45146 16.4018 6.35651C16.4567 6.26156 16.4902 6.15572 16.4998 6.04645C16.5094 5.93717 16.4948 5.82713 16.4573 5.72407C16.4197 5.62101 16.36 5.52745 16.2823 5.44997L12.5893 1.75697C12.4621 1.61984 12.2915 1.53078 12.1062 1.50482C11.9209 1.47887 11.7324 1.51759 11.5723 1.61447C11.4824 1.67725 11.4073 1.75899 11.3524 1.85394C11.2974 1.94889 11.264 2.05473 11.2544 2.164C11.2448 2.27327 11.2593 2.38332 11.2969 2.48638C11.3345 2.58944 11.3942 2.683 11.4718 2.76047L11.5288 2.81747C11.8526 3.14223 12.0345 3.58212 12.0345 4.04072C12.0345 4.49932 11.8526 4.93922 11.5288 5.26397L10.3288 6.46397C10.2355 6.55692 10.0858 6.54806 9.99264 6.45491L9.24515 5.70741C9.16325 5.62551 9.18635 5.48604 9.26834 5.40422L10.4683 4.20422C10.5113 4.16095 10.5354 4.10245 10.5354 4.04147C10.5354 3.9805 10.5113 3.922 10.4683 3.87872L10.4113 3.82172C10.18 3.59053 10.0019 3.31168 9.88939 3.00462C9.77686 2.69756 9.73262 2.36965 9.75975 2.04375C9.78688 1.71784 9.88473 1.40176 10.0465 1.11753C10.2082 0.833302 10.43 0.587749 10.6963 0.397974C11.1457 0.0936831 11.6877 -0.0429907 12.2275 0.0118483C12.7674 0.0666873 13.2709 0.30955 13.6498 0.697974L17.3406 4.39022C17.5719 4.62137 17.7501 4.90017 17.8627 5.2072C17.9753 5.51423 18.0196 5.84212 17.9925 6.16803C17.9655 6.49393 17.8677 6.81002 17.706 7.09428C17.5443 7.37854 17.3226 7.62414 17.0563 7.81397C16.6025 8.12312 16.0534 8.26031 15.5075 8.20093C14.9616 8.14155 14.4548 7.88947 14.0781 7.48997C14.0638 7.47099 14.0445 7.45637 14.0224 7.44776C14.0003 7.43914 13.9762 7.43688 13.9528 7.44122C13.8863 7.44218 13.8228 7.46909 13.7758 7.51622L12.5856 8.70722C12.5058 8.81865 12.353 8.84819 12.2477 8.76058C11.9821 8.53969 11.6935 8.21745 11.521 8.01522Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.83045 1.52029C2.12334 1.2274 2.57088 1.20007 2.83006 1.45924L16.4922 15.1214C16.7514 15.3806 16.7241 15.8281 16.4312 16.121C16.1383 16.4139 15.6907 16.4412 15.4316 16.1821L1.7694 2.5199C1.51022 2.26073 1.53756 1.81318 1.83045 1.52029Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_15384_4398">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ICPointMap: React.FC<IconProps> = ({
  fill = "var(--text-info)",
  width = 12,
  height = 12,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1155 2.54921C11.3516 1.78171 10.6327 1.06356 9.86565 1.29957L1.96109 3.73175C1.09912 3.99697 1.00065 5.17826 1.80784 5.58185L5.15802 7.2569L6.83305 10.6069C7.23655 11.4139 8.41776 11.3159 8.68305 10.4538C8.68305 10.4538 8.68305 10.4538 8.68305 10.4538L11.1155 2.54921ZM10.1596 2.2554L7.72734 10.1594L6.05248 6.80972C5.95571 6.61617 5.79874 6.45923 5.60523 6.36248L2.25522 4.68751L10.1596 2.2554Z"
        fill={fill}
      />
    </svg>
  );
};
