<template>
     <div
          style="z-index: 5000 !important; background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(3px)"
          class="flex justify-content-center align-items-center h-screen w-screen fixed">
          <ProgressSpinner
               style="width: 60px; height: 60px"
               strokeWidth="8"
               fill="#f0f0f0"
               animationDuration=".5s"
               aria-label="Custom ProgressSpinner" />
     </div>
</template>
